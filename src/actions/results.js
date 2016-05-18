// TODO Fix caching

import xhr from "xhr";
import {deferred} from "adehun";


let handleError = function() {

};

export let server = {
	performXhr: function(options, cb) {
		if (typeof Promise === "undefined") {
			var {resolve, promise} = deferred();
			xhr(options, function () {
				resolve();
				cb.apply(this, arguments);
			});
			return promise;
		} else {
			return new Promise(function (resolve) {
				xhr(options, function () {
					resolve();
					cb.apply(this, arguments);
				});
			});
		}
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
		let searchId = url.replace(/.*\/([^?]+).*/, "$1");

		body = JSON.parse(body);
		if (body.results != null && body.refs == null) {
			body.refs = body.results;
		}

		done(body, searchId);
	};

	return server.performXhr(options, cb);
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

	return server.performXhr(options, cb);
};

let dispatchResponse = (dispatch, type, response, searchId) =>
	dispatch({
		type: type,
		response: response,
		searchId: searchId
	});

// let cache = {};

export function fetchResults() {
	return function (dispatch, getState) {
		dispatch({type: "CLEAR_LIST"});

		let state = getState();
		let query = state.queries.all.length ?
			state.queries.all[state.queries.all.length - 1] :
			state.queries.default;

		let stringifiedQuery = JSON.stringify(query);

		let dispatchTime = new Date().getTime();

		// if (cache.hasOwnProperty(stringifiedQuery)) {
		// 	return dispatchResponse(dispatch, "RECEIVE_RESULTS", cache[stringifiedQuery]);
		// }

		return postResults(
			stringifiedQuery,
			state.config.headers || {},
			state.config.baseURL + state.config.searchPath,
			state.config.rows,
			(response, searchId) => {
				// cache[stringifiedQuery] = response;

				return dispatch({
					type: "RECEIVE_RESULTS",
					response: response,
					searchId: searchId,
					dispatchTime: dispatchTime
				});
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
		let dispatchTime = new Date().getTime();

		return getResults(
			url,
			state.config.headers || {},
			(response, searchId) => {
				// cache[url] = response;

				return dispatch({
					type: "RECEIVE_NEXT_RESULTS",
					response: response,
					searchId: searchId,
					dispatchTime: dispatchTime
				});
			}
		);
	};
}
