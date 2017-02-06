"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];

	switch (action.type) {
		case "REQUEST_RESULTS":
			state = _extends({}, state, { requesting: true });

			break;

		case "CLEAR_LIST":
			var newState = state;

			if (newState.last) {
				newState.last.refs = [];
				newState.requesting = true;
			}

			state = newState;

			break;

		case "RECEIVE_RESULTS":
			if (state.first == null) {
				return createFirstResultsState(action.response, action.searchId);
			}

			var response = _extends({}, action.response, {
				facets: updateFacetsWithReceivedCounts(state.first.facets, action.response.facets),
				dispatchTime: action.dispatchTime
			});

			state = _extends({}, addResponseToState(state, response), {
				searchId: action.searchId
			});

			break;

		case "RECEIVE_NEXT_RESULTS":
			var withConcatResults = _extends({}, action.response, {
				refs: [].concat(_toConsumableArray(state.last.refs), _toConsumableArray(action.response.refs)),
				facets: updateFacetsWithReceivedCounts(state.last.facets, action.response.facets),
				dispatchTime: action.dispatchTime
			});

			state = _extends({}, addResponseToState(state, withConcatResults), {
				searchId: action.searchId
			});

			break;
	}

	return state;
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var updateFacetsWithReceivedCounts = function updateFacetsWithReceivedCounts(initFacets, receivedFacets) {
	receivedFacets = receivedFacets || [];
	receivedFacets = receivedFacets.reduce(function (prev, current) {
		prev[current.name] = current;

		return prev;
	}, {});

	return initFacets.map(function (facet) {
		var options = facet.options.map(function (option) {
			var count = 0;

			if (receivedFacets.hasOwnProperty(facet.name)) {
				var found = receivedFacets[facet.name].options.filter(function (receivedOption) {
					return option.name === receivedOption.name;
				});

				if (found.length) {
					count = found[0].count;
				}
			}

			option.count = count;

			return option;
		});

		return _extends({}, facet, { options: options });
	});
};

var addResponseToState = function addResponseToState(state, response) {
	var all = [].concat(_toConsumableArray(state.all), [response]).sort(function (a, b) {
		return a.dispatchTime > b.dispatchTime;
	});
	var s = _extends({}, state, {
		all: all,
		last: all[all.length - 1],
		requesting: false
	});

	return s;
};

var initialState = {
	all: [],
	facets: {},
	first: null,
	last: null,
	requesting: false,
	searchId: null
};

var createFirstResultsState = function createFirstResultsState(result, searchId) {
	result.dispatchTime = 0;
	return _extends({}, addResponseToState(initialState, result), {
		first: result,
		last: result,
		searchId: searchId
	});
};

exports.createFirstResultsState = createFirstResultsState;