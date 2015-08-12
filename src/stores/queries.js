import dispatcher from "../dispatcher";
import BaseStore from "./base";
import Immutable from "immutable";

const CHANGE_EVENT = "change";

class Queries extends BaseStore {
	constructor() {
		super();

		this.data = Immutable.fromJS({
			"textLayers": ["Diplomatic", "Opmerkingen en verwijzingen", "Comments and References", "Transcription", "Transcripción", "Transcriptie", "Vertaling", "Translation", "Traducción", "Comentarios y referencias"],
			"searchInAnnotations": true,
			"searchInTranscriptions": true,
			"facetValues": []
		});
	}

	getState() {
		return this.data;
	}

	setDefaults(props) {
		let sortParameters = props.sortFields.map((fieldName) => {
			return {
				fieldname: fieldName,
				direction: "asc"
			}
		});

		this.data = this.data.withMutations((map) => {
			map.set("sortParameters", sortParameters);
			map.set("resultFields", props.sortFields);
		});
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
		console.log(index);
		if (index > -1) {
			let oldValues = this.data.get("facetValues").get(index).get("values");

			let facetValues = (oldValues.size === 1) ?
				this.data.get("facetValues").delete(index) :
				this.data.get("facetValues").deleteIn([index, "values", oldValues.indexOf(value)]);

			console.log(facetValues.toJS());

			this.data = this.data.set("facetValues", facetValues);
		}

	}
}

let queries = new Queries();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "QUERIES_SET_DEFAULTS":
			queries.setDefaults(payload.action.props);
			break;
		case "QUERIES_ADD":
			queries.add(payload.action.facetName, payload.action.value);
			break;
		case "QUERIES_REMOVE":
			queries.remove(payload.action.facetName, payload.action.value);
			break;
		default:
			return;
	}

	queries.emit(CHANGE_EVENT);
};

queries.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default queries;