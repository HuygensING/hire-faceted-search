import dispatcher from "../dispatcher";
import BaseStore from "./base";

const CHANGE_EVENT = "change";

class Queries extends BaseStore {
	constructor() {
		super();

		this.data = {
			"sortParameters": [
				{
					"fieldname": "Sender",
					"direction": "asc"
				}, {
					"fieldname": "Recipient",
					"direction": "asc"
				}, {
					"fieldname": "Date",
					"direction": "asc"
				}
			],
			"resultFields": ["Sender", "Recipient", "Date"],
			"textLayers": ["Diplomatic", "Translation"],
			"searchInAnnotations": true,
			"searchInTranscriptions": true,
			"facetValues": []
		};
	}

	getState() {
		return this.data;
	}

	add(facetName, value) {
		let found = this.data.facetValues.filter((facetValue) =>
			facetValue.name === facetName
		);

		if (found.length) {
			found[0].values.push(value)
		} else {
			this.data.facetValues.push({
				name: facetName,
				values: [value]
			})
		}
	}
}

let queries = new Queries();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "QUERIES_ADD":
			queries.add(payload.action.facetName, payload.action.value);
			break;
		default:
			return;
	}

	queries.emit(CHANGE_EVENT);
};

queries.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default queries;