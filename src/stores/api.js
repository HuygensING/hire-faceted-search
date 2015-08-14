import xhr from "xhr";

import serverActions from "../actions/server";
import queriesStore from "../stores/queries";
import configStore from "../stores/config";

export default {
	getAllResults() {
		let options = {
			url: `${configStore.getState().get("baseURL")}api/search`
		};

		let done = function(err, resp, body) {
			if (err) { handleError(err, resp, body); }

			serverActions.receiveAllResults(JSON.parse(body));
		};

		xhr(options, done);
	},

	getResults() {
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
				url: resp.headers.location
			}

			let getDone = function(err, resp, body) {
				if (err) { handleError(err, resp, body); }

				serverActions.receiveResults(JSON.parse(body));
			}

			xhr(getOptions, getDone)
		};

		xhr(postOptions, postDone);
	}
};