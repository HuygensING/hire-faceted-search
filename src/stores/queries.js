import dispatcher from "../dispatcher";
import BaseStore from "./base";
import Immutable from "immutable";

const CHANGE_EVENT = "change";

class Queries extends BaseStore {
	constructor() {
		super();

		this.model = Immutable.fromJS({
			"facetValues": [],
			"searchInAnnotations": true,
			"searchInTranscriptions": true,
			"term": "",
			"textLayers": ["Diplomatic", "Opmerkingen en verwijzingen", "Comments and References", "Transcription", "Transcripción", "Transcriptie", "Vertaling", "Translation", "Traducción", "Comentarios y referencias"]
		});

		this.data = this.model;
	}

	getState() {
		return this.data;
	}

	reset() {
		this.data = this.model;
	}

	setDefaults(config) {
		let sortLevels = Immutable.fromJS(config.levels);
		let sortParameters = sortLevels.map((fieldName) =>
			new Immutable.Map({
				fieldname: fieldName,
				direction: "asc"
			}));

		this.model = this.data.withMutations((map) => {
			map.set("sortParameters", sortParameters);
			map.set("resultFields", sortLevels);
		});

		this.data = this.model;
	}

	setSortParameter(field) {
		let sorted = this.data.get("sortParameters").sort((valA, valB) => {
			if (valA.get("fieldname") === field) {
				return -1;
			}

			if (valB.get("fieldname") === field) {
				return 1;
			}

			if (valA.get("fieldname") < valB.get("fieldname")) {
				return -1;
			}

			if (valA.get("fieldname") > valB.get("fieldname")) {
				return 1;
			}

			return 0;
		});

		this.data = this.data.set("sortParameters", sorted);
	}

	add(facetName, value) {
		let index = this.data.get("facetValues").findIndex((facetValue) =>
			facetValue.get("name") === facetName
		);

		let facetValues;

		if (index > -1) {
			let newValues = this.data.get("facetValues").get(index).get("values").push(value)
			facetValues = this.data.get("facetValues").setIn([index, "values"], newValues);
		} else {
			facetValues = this.data.get("facetValues").push(Immutable.fromJS({
				name: facetName,
				values: [value]
			}));
		}

		this.data = this.data.set("facetValues", facetValues)
	}

	remove(facetName, value) {
		let index = this.data.get("facetValues").findIndex((facetValue) =>
			facetValue.get("name") === facetName
		);

		if (index > -1) {
			let oldValues = this.data.get("facetValues").get(index).get("values");

			let facetValues = (oldValues.size === 1) ?
				this.data.get("facetValues").delete(index) :
				this.data.get("facetValues").deleteIn([index, "values", oldValues.indexOf(value)]);

			this.data = this.data.set("facetValues", facetValues);
		}

	}

	changeSearchTerm(value) {
		this.data = this.data.set("term", value);
	}
}

let queries = new Queries();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "QUERIES_SET_DEFAULTS":
			queries.setDefaults(payload.action.props);
			break;
		case "QUERIES_SET_SORT_PARAMETER":
			queries.setSortParameter(payload.action.field);
			break;
		case "QUERIES_ADD":
			queries.add(payload.action.facetName, payload.action.value);
			break;
		case "QUERIES_REMOVE":
			queries.remove(payload.action.facetName, payload.action.value);
			break;
		case "QUERIES_RESET":
			queries.reset();
			break;
		case "QUERIES_CHANGE_SEARCH_TERM":
			queries.changeSearchTerm(payload.action.value);
			break;
		default:
			return;
	}

	queries.emit(CHANGE_EVENT);
};

queries.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default queries;