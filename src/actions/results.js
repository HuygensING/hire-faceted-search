// TODO Fix caching

import xhr from "xhr";

let handleError = function() {

};

let getResults = function(url, done) {
	let options = {
		headers: {
			"Content-Type": "application/json"
		},
		url: url
	};

	let cb = function(err, resp, body) {
		if (err) { handleError(err, resp, body); }

		done(JSON.parse(body));
	};

	xhr(options, cb);
};

let postResults = function(query, baseUrl, rows, done) {
	let options = {
		data: query,
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		url: `${baseUrl}api/search`
	};

	let cb = function(err, resp, body) {
		if (err) { handleError(err, resp, body); }

		let url = `${resp.headers.location}?rows=${rows}`;

		getResults(url, done);
	};

	xhr(options, cb);
};

let dispatchResponse = (dispatch, type, response) =>
	dispatch({
		type: type,
		response: response
	});

let cache = {};

export function fetchResults() {
	return function (dispatch, getState) {
		dispatch({type: "REQUEST_RESULTS"});

		let state = getState();
		let query = state.queries.all.length ?
			state.queries.all[state.queries.all.length - 1] :
			state.queries.default;

		let stringifiedQuery = JSON.stringify(query);

		// if (cache.hasOwnProperty(stringifiedQuery)) {
		// 	return dispatchResponse(dispatch, "RECEIVE_RESULTS", cache[stringifiedQuery]);
		// }

		return postResults(
			stringifiedQuery,
			state.config.baseURL,
			state.config.rows,
			(response) => {
				cache[stringifiedQuery] = response;

				return dispatchResponse(dispatch, "RECEIVE_RESULTS", response);
			}
		);
	};
}

export function fetchNextResults(url) {
	return function (dispatch) {
		dispatch({type: "REQUEST_RESULTS"});

		// if (cache.hasOwnProperty(url)) {
		// 	return dispatchResponse(dispatch, "RECEIVE_RESULTS_FROM_URL", cache[url]);
		// }

		return getResults(url, (response) => {
			cache[url] = response;

			return dispatchResponse(dispatch, "RECEIVE_NEXT_RESULTS", response);
		});
	};
}