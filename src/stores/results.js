import Immutable from "immutable";

import dispatcher from "../dispatcher";

import BaseStore from "./base";

import displayName from "./utils/relation-display-names";

const CHANGE_EVENT = "change";

let toObject = function(prev, current) {
	prev[current.name] = current;

	return prev;
}

class ResultsStore extends BaseStore {
	constructor() {
		super();

		this.data = {
			initResults: new Immutable.Map({
				results: []
			}),
			queryResults: new Immutable.List()
		};
	}

	getState() {
		return this.data;
	}

	receiveAll(data) {
		this.data.initResults = Immutable.fromJS(data);
		this.data.queryResults = this.data.queryResults.push(this.data.initResults);
	}

	receive(data) {
		let facetData = data.facets.reduce(toObject, {});

		let facets = this.data.initResults.get("facets").map((facet) => {
			let options = facet.get("options")
				.map((option) => {
					let count = 0

					if (facetData.hasOwnProperty(facet.get("name"))) {
						let found = facetData[facet.get("name")].options
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

		this.data.queryResults = this.data.queryResults.push(Immutable.fromJS(data));
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