"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.server = undefined;
exports.fetchResults = fetchResults;
exports.fetchNextResults = fetchNextResults;

var _xhr = require("xhr");

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleError = function handleError() {}; // TODO Fix caching

var server = exports.server = {
	performXhr: function performXhr(options, cb) {
		(0, _xhr2.default)(options, cb);
	}
};

var getResults = function getResults(url, headers, done) {
	var options = {
		headers: Object.assign(headers, {
			"Content-Type": "application/json"
		}),
		url: url
	};

	var cb = function cb(err, resp, body) {
		if (err) {
			handleError(err, resp, body);
		}
		var searchId = url.replace(/.*\/([^?]+).*/, "$1");

		body = JSON.parse(body);
		if (body.results != null && body.refs == null) {
			body.refs = body.results;
		}

		done(body, searchId);
	};

	server.performXhr(options, cb);
};

var postResults = function postResults(query, headers, url, rows, done) {
	var options = {
		data: query,
		headers: Object.assign(headers, {
			"Content-Type": "application/json"
		}),
		method: "POST",
		url: url
	};

	var cb = function cb(err, resp, body) {
		if (err) {
			handleError(err, resp, body);
		}

		// let cbUrl = `${resp.headers.location}?rows=${rows}`;
		var cbUrl = resp.headers.location;

		getResults(cbUrl, headers, done);
	};

	server.performXhr(options, cb);
};

var dispatchResponse = function dispatchResponse(dispatch, type, response, searchId) {
	return dispatch({
		type: type,
		response: response,
		searchId: searchId
	});
};

// let cache = {};

function fetchResults() {
	return function (dispatch, getState) {
		dispatch({ type: "CLEAR_LIST" });

		var state = getState();
		var query = state.queries.all.length ? state.queries.all[state.queries.all.length - 1] : state.queries.default;

		var stringifiedQuery = JSON.stringify(query);

		var dispatchTime = new Date().getTime();

		// if (cache.hasOwnProperty(stringifiedQuery)) {
		// 	return dispatchResponse(dispatch, "RECEIVE_RESULTS", cache[stringifiedQuery]);
		// }

		return postResults(stringifiedQuery, state.config.headers || {}, state.config.baseURL + state.config.searchPath, state.config.rows, function (response, searchId) {
			// cache[stringifiedQuery] = response;

			return dispatch({
				type: "RECEIVE_RESULTS",
				response: response,
				searchId: searchId,
				dispatchTime: dispatchTime
			});
		});
	};
}

function fetchNextResults(url) {
	return function (dispatch, getState) {
		dispatch({ type: "REQUEST_RESULTS" });

		var state = getState();
		// if (cache.hasOwnProperty(url)) {
		// 	return dispatchResponse(dispatch, "RECEIVE_RESULTS_FROM_URL", cache[url]);
		// }
		var dispatchTime = new Date().getTime();

		return getResults(url, state.config.headers || {}, function (response, searchId) {
			// cache[url] = response;

			return dispatch({
				type: "RECEIVE_NEXT_RESULTS",
				response: response,
				searchId: searchId,
				dispatchTime: dispatchTime
			});
		});
	};
}