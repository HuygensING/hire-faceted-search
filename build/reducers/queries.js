"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	var action = arguments[1];

	var query = void 0;

	switch (action.type) {
		// Override query defaults when props.query is set.
		case "SET_INITIAL_QUERY":
			var initialQuery = _extends({}, _defaults.queryDefaults, action.initialQuery);

			state = _extends({}, state, {
				all: [initialQuery],
				last: initialQuery
			});

			break;

		case "SET_RESULTS_SORT":
			query = _extends({}, state.last, { sortParameters: [{ fieldname: action.field, direction: "asc" }] });

			state = addQueryToState(state, query);

			break;

		case "REMOVE_FACET_VALUE":
			query = _extends({}, state.last, {
				facetValues: removeFacetValue(state.last.facetValues, action.facetName, action.value)
			});

			state = addQueryToState(state, query);

			break;

		case "ADD_FACET_VALUE":
			query = _extends({}, state.last, {
				facetValues: addFacetValue(state.last.facetValues, action.facetName, action.value)
			});
			state = addQueryToState(state, query);

			break;

		case "ADD_FACET_RANGE":
			query = _extends({}, state.last, {
				facetValues: addRangeFacetValue(state.last.facetValues, action.facetName, action.value)
			});
			state = addQueryToState(state, query);

			break;

		case "SET_FACET_VALUES":
			query = _extends({}, state.last, {
				facetValues: action.facetValues
			});
			state = addQueryToState(state, query);

			break;

		case "CHANGE_SEARCH_TERM":
			query = _extends({}, state.last, { term: action.value });
			state = addQueryToState(state, query);

			break;

		case "CHANGE_FULL_TEXT_SEARCH_TERM":
			query = _extends({}, state.last, {
				fullTextSearchParameters: setFullTextSearchParameter(action.field, action.value, state.last.fullTextSearchParameters)
			});
			if (!query.fullTextSearchParameters.length) {
				delete query.fullTextSearchParameters;
			}
			state = addQueryToState(state, query);

			break;

		case "SET_FULL_TEXT_SEARCH_TERMS":
			query = _extends({}, state.last, {
				fullTextSearchParameters: action.fullTextSearchParameters
			});
			state = addQueryToState(state, query);

			break;

		case "REMOVE_FULL_TEXT_SEARCH_TERMS":
			query = state.last;
			delete query.fullTextSearchParameters;
			state = addQueryToState(state, query);

			break;

		case "NEW_SEARCH":
			state = addQueryToState(state, state.default);

			break;
	}

	return state;
};

var _defaults = require("../defaults");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var removeFacetValue = function removeFacetValue(facetValues, name, value) {
	var foundFacetValue = facetValues.filter(function (facetValue) {
		return facetValue.name === name;
	});

	var otherFacetValues = facetValues.filter(function (facetValue) {
		return facetValue.name !== name;
	});
	if (foundFacetValue[0].values) {
		return foundFacetValue[0].values.length > 1 ? otherFacetValues.concat({
			name: name,
			values: foundFacetValue[0].values.filter(function (v) {
				return v !== value;
			})
		}) : otherFacetValues;
	} else {
		return otherFacetValues;
	}
};

var addFacetValue = function addFacetValue(facetValues, name, value) {
	var foundFacetValue = facetValues.filter(function (facetValue) {
		return facetValue.name === name;
	});

	var otherFacetValues = facetValues.filter(function (facetValue) {
		return facetValue.name !== name;
	});

	var selectedValues = foundFacetValue.length ? foundFacetValue[0].values.concat([value]) : [value];

	var newFacetValue = {
		name: name,
		values: selectedValues
	};

	return otherFacetValues.concat(newFacetValue);
};

var addRangeFacetValue = function addRangeFacetValue(facetValues, name, value) {
	var found = false;
	for (var i = 0; i < facetValues.length; i++) {
		if (facetValues[i].name === name) {
			facetValues[i] = _extends({ name: name }, value);
			found = true;
			break;
		}
	}
	if (!found) {
		facetValues = [].concat(_toConsumableArray(facetValues), [_extends({ name: name }, value)]);
	}

	return facetValues;
};

var addQueryToState = function addQueryToState(state, query) {
	return _extends({}, state, {
		all: [].concat(_toConsumableArray(state.all), [query]),
		last: query
	});
};

var setFullTextSearchParameter = function setFullTextSearchParameter(field, value) {
	var last = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	var current = last.filter(function (param) {
		return param.name !== field;
	});
	if (value.length) {
		current.push({ name: field, term: value });
	}
	return current;
};

var initialState = {
	all: [_defaults.queryDefaults],
	default: _defaults.queryDefaults,
	last: _defaults.queryDefaults
};