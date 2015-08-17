import xhr from "xhr";

import serverActions from "../actions/server";
import queriesStore from "../stores/queries";
import configStore from "../stores/config";

let postResults = function(receiveFunc) {
	let postOptions = {
		data: JSON.stringify(queriesStore.getState()),
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		url: `${configStore.getState().get("baseURL")}api/search`
	};

	let postDone = function(err, resp, body) {
		if (err) { handleError(err, resp, body); }

		let url = `${resp.headers.location}?rows=${configStore.getState().get("rows")}`

		getResults(url, receiveFunc);
	};

	xhr(postOptions, postDone);
}

let getResults = function(url, receiveFunc) {
	let getOptions = {
		headers: {
			"Content-Type": "application/json",
		},
		url: url
	}

	let getDone = function(err, resp, body) {
		if (err) { handleError(err, resp, body); }

		serverActions[receiveFunc](JSON.parse(body));
	};

	xhr(getOptions, getDone)
}

export default {
	getAllResults() {
		postResults("receiveAllResults");
	},

	getResults() {
		postResults("receiveResults");
	},

	getResultsFromUrl(url) {
		getResults(url, "receiveResults");
	}
};