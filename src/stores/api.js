import xhr from "xhr";

import serverActions from "../actions/server";
import queriesStore from "../stores/queries";

let baseUrl = "http://boschdoc.huygens.knaw.nl/draft";

export default {
	getAllResults() {
		let options = {
			url: `${baseUrl}/api/search`
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
			url: `${baseUrl}/api/search`
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