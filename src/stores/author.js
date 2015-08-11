// TODO Remove uncamel cased vars
import Immutable from "immutable";

import dispatcher from "../dispatcher";

import BaseStore from "./base";
import authorModel from "./models/author";

import {castArray} from "hire-forms-utils";

let diffData = function(receivedData) {
	let contract = authorModel.keySeq().toArray();
	// let serverContract = ["@type", "names", "gender", "birthDate", "deathDate", "types", "links", "floruit", "bibliography", "children", "fsPseudonyms", "health", "livedIn", "nationality", "notes", "personalSituation", "tempOldId", "tempBirthPlace", "tempChildren", "tempCollaborations", "tempDeathPlace", "tempDeath", "tempFinancialSituation", "tempMemberships", "tempMotherTongue", "tempName", "tempPlaceOfBirth", "tempPsChildren", "tempPseudonyms", "tempSpouse", "relatedLocations", "_id", "^rev", "^created", "^modified", "^pid", "^deleted", "@relationCount", "@properties", "@relations", "@variationRefs"];

	let receivedProps = Object.keys(receivedData);

	let addedProps = receivedProps.filter((prop) =>
		contract.indexOf(prop) === -1
	);

	let removedProps = contract.filter((prop) =>
		receivedProps.indexOf(prop) === -1
	);

	return {
		added: addedProps,
		removed: removedProps
	};
};

const CHANGE_EVENT = "change";

class AuthorStore extends BaseStore {
	constructor() {
		super();

		this.setDefaults();
	}

	getState() {
		return {
			author: this.model,
			serverAuthor: this.serverModel
		};
	}

	setDefaults() {
		this.serverModel = authorModel;
		this.model = authorModel;
	}

	deleteKey(key) {
		this.model = this.model.deleteIn(key);
	}

	receive(data) {
		let diff = diffData(data);
		if ((diff.added.length > 0) || (diff.removed.length > 0)) {
			console.warn("Contracts mismatch! ", diff);
		}

		this.model = authorModel.mergeDeep(Immutable.fromJS(data));
		this.serverModel = this.model;
	}

	setKey(key, value) {
		key = castArray(key);

		// Turn an array into an Immutable.List
		if (Array.isArray(value)) {
			value = new Immutable.List(value);
		}

		// Turn a key-value object into an Immutable.Map
		if (value.hasOwnProperty("key")) {
			value = new Immutable.Map(value);
		}

		this.model = this.model.setIn(key, value);
	}

}

let authorStore = new AuthorStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "AUTHOR_RECEIVE":
			authorStore.receive(payload.action.data);
			break;
		case "AUTHOR_SET_KEY":
			authorStore.setKey(payload.action.key, payload.action.value);
			break;
		case "AUTHOR_DELETE_KEY":
			authorStore.deleteKey(payload.action.key);
			break;
		case "AUTHOR_NEW":
			authorStore.setDefaults();
			break;
		default:
			return;
	}

	authorStore.emit(CHANGE_EVENT);
};

authorStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default authorStore;