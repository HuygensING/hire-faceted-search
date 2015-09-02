// TODO Fix caching

import xhr from "xhr";

let handleError = function() {

};

export let server = {
	performXhr: function(options, cb) {
		xhr(options, cb);
	}
};

let getResults = function(url, headers, done) {
	let options = {
		headers: Object.assign(headers, {
			"Content-Type": "application/json"
		}),
		url: url
	};

	let cb = function(err, resp, body) {
		if (err) { handleError(err, resp, body); }

		done(JSON.parse(body));
	};

	server.performXhr(options, cb);
};

let postResults = function(query, headers, url, rows, done) {
	let options = {
		data: query,
		headers: Object.assign(headers, {
			"Content-Type": "application/json"
		}),
		method: "POST",
		url: url
	};

	let cb = function(err, resp, body) {
		if (err) { handleError(err, resp, body); }

		let cbUrl = `${resp.headers.location}?rows=${rows}`;

		getResults(cbUrl, headers, done);
	};

	server.performXhr(options, cb);
};

let dispatchResponse = (dispatch, type, response) =>
	dispatch({
		type: type,
		response: response
	});

let cache = {};

export function fetchResults() {
	return function (dispatch, getState) {
		dispatch({type: "CLEAR_LIST"});

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
			state.config.headers || {},
			state.config.baseURL + state.config.searchPath,
			state.config.rows,
			(response) => {
				cache[stringifiedQuery] = response;

				return dispatchResponse(dispatch, "RECEIVE_RESULTS", response);
			}
		);
	};
}

export function fetchNextResults(url) {
	return function (dispatch, getState) {
		dispatch({type: "REQUEST_RESULTS"});

		let state = getState();
		// if (cache.hasOwnProperty(url)) {
		// 	return dispatchResponse(dispatch, "RECEIVE_RESULTS_FROM_URL", cache[url]);
		// }

		return getResults(
			url,
			state.config.headers || {},
			(response) => {
				cache[url] = response;

				return dispatchResponse(dispatch, "RECEIVE_NEXT_RESULTS", response);
			}
		);
	};
}