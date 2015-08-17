import xhr from "xhr";

import serverActions from "../actions/server";
import queriesStore from "../stores/queries";
import configStore from "../stores/config";

let getResults = function(receiveFunc) {
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

		let getOptions = {
			headers: {
				"Content-Type": "application/json",
			},
			url: `${resp.headers.location}?rows=${configStore.getState().get("rows")}`
		}

		let getDone = function(err, resp, body) {
			if (err) { handleError(err, resp, body); }

			serverActions[receiveFunc](JSON.parse(body));
		};

		xhr(getOptions, getDone)
	};

	xhr(postOptions, postDone);
}

export default {
	getAllResults() {
		getResults("receiveAllResults");
	},

	getResults() {
		getResults("receiveResults");
	}
};