"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.selectFacetRange = selectFacetRange;
exports.selectFacetValue = selectFacetValue;
exports.setFacetValues = setFacetValues;
exports.newSearch = newSearch;
exports.changeSearchTerm = changeSearchTerm;
exports.changeFullTextSearchField = changeFullTextSearchField;
exports.setFullTextSearchFields = setFullTextSearchFields;
exports.removeFullTextSearchFields = removeFullTextSearchFields;
exports.setSort = setSort;

var _results = require("./results");

function createNewQuery(dispatchData) {
	return function (dispatch) {
		dispatch(dispatchData);

		dispatch((0, _results.fetchResults)());
	};
}

function selectFacetRange(facetName, value) {
	return createNewQuery({
		type: "ADD_FACET_RANGE",
		facetName: facetName,
		value: value
	});
}

function selectFacetValue(facetName, value, remove) {
	var addition = remove ? "REMOVE" : "ADD";

	return createNewQuery({
		facetName: facetName,
		type: addition + "_FACET_VALUE",
		value: value
	});
}

function setFacetValues(facetValues) {
	return createNewQuery({
		type: "SET_FACET_VALUES",
		facetValues: facetValues
	});
}

function newSearch() {
	return createNewQuery({
		type: "NEW_SEARCH"
	});
}

function changeSearchTerm(value) {
	return createNewQuery({
		type: "CHANGE_SEARCH_TERM",
		value: value
	});
}

function changeFullTextSearchField(field, value) {
	return createNewQuery({
		type: "CHANGE_FULL_TEXT_SEARCH_TERM",
		field: field,
		value: value
	});
}

function setFullTextSearchFields(fullTextSearchParameters) {
	return createNewQuery({
		type: "SET_FULL_TEXT_SEARCH_TERMS",
		fullTextSearchParameters: fullTextSearchParameters
	});
}

function removeFullTextSearchFields() {
	return createNewQuery({
		type: "REMOVE_FULL_TEXT_SEARCH_TERMS"
	});
}

function setSort(field) {
	return createNewQuery({
		type: "SET_RESULTS_SORT",
		field: field
	});
}