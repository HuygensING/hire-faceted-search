import Immutable from "immutable";

import dispatcher from "../dispatcher";

import BaseStore from "./base";

const CHANGE_EVENT = "change";

let toObject = function(prev, current) {
	prev[current.name] = current;

	return prev;
}

class ResultsStore extends BaseStore {
	constructor() {
		super();

		this.data = Immutable.fromJS({
			initResults: new Immutable.Map({
				results: []
			}),
			queryResults: new Immutable.List()
		});
	}

	getState() {
		return this.data;
	}

	receiveAll(data) {
		this.data = this.data.set("initResults", Immutable.fromJS(data));
		this.data = this.data.set("queryResults", this.data.get("queryResults").push(this.data.get("initResults")));
	}

	receive(data) {
		let receivedData = data.facets.reduce(toObject, {});

		let facets = this.data.get("initResults").get("facets").map((facet) => {
			let options = facet.get("options").map((option) => {
				let count = 0

				if (receivedData.hasOwnProperty(facet.get("name"))) {
					let found = receivedData[facet.get("name")].options
						.filter((opt) => option.get("name") === opt.name);

					if (found.length) {
						count = found[0].count
					}
				}

				return option.set("count", count);
			});

			return facet.set("options", options);
		})


		data.facets = facets;

		this.data = this.data.set("queryResults", this.data.get("queryResults").push(Immutable.fromJS(data)));
	}
}

let resultsStore = new ResultsStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "RESULTS_RECEIVE_ALL":
			resultsStore.receiveAll(payload.action.data);
			break;
		case "RESULTS_RECEIVE":
			resultsStore.receive(payload.action.data);
			break;
		default:
			return;
	}

	resultsStore.emit(CHANGE_EVENT);
};

resultsStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default resultsStore;