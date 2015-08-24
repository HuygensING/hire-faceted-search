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
		data: JSON.stringify(query),
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

export function fetchResults() {
	return function (dispatch, getState) {
		dispatch({type: "REQUEST_RESULTS"});

		let state = getState();
		let query = state.queries.all.length ?
			state.queries.all[state.queries.all.length - 1] :
			state.queries.default;

		return postResults(
			query,
			state.config.baseURL,
			state.config.rows,
			(response) => dispatch({
				type: "RECEIVE_RESULTS",
				response: response
			})
		);
	};
}

export function fetchResultsFromUrl(url) {
	return function (dispatch) {
		dispatch({type: "REQUEST_RESULTS"});

		return getResults(url,
			(response) => dispatch({
				type: "RECEIVE_RESULTS_FROM_URL",
				response: response
			})
		);
	};
}