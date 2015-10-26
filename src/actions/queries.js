import {fetchResults} from "./results";

function createNewQuery(dispatchData) {
	return function (dispatch) {
		dispatch(dispatchData);

		dispatch(fetchResults());
	};
}

export function selectFacetRange(facetName, value) {
	return createNewQuery({
		type: "ADD_FACET_RANGE",
		facetName: facetName,
		value: value
	});
}

export function selectFacetValue(facetName, value, remove) {
	let part1 = {
		facetName: facetName,
		value: value
	};

	let part2 = remove ?
		{type: "REMOVE_FACET_VALUE"} :
		{type: "ADD_FACET_VALUE"};

	return createNewQuery(Object.assign(part1, part2));
}

export function setFacetValues(facetValues) {
	return createNewQuery({
		type: "SET_FACET_VALUES",
		facetValues: facetValues
	});
}

export function newSearch() {
	return createNewQuery({
		type: "NEW_SEARCH"
	});
}

export function changeSearchTerm(value) {
	return createNewQuery({
		type: "CHANGE_SEARCH_TERM",
		value: value
	});
}

export function changeFullTextSearchField(field, value) {
	return createNewQuery({
		type: "CHANGE_FULL_TEXT_SEARCH_TERM",
		field: field,
		value: value
	});
}

export function setFullTextSearchFields(fullTextSearchParameters) {
	return createNewQuery({
		type: "SET_FULL_TEXT_SEARCH_TERMS",
		fullTextSearchParameters: fullTextSearchParameters
	});
}

export function removeFullTextSearchFields() {
	return createNewQuery({
		type: "REMOVE_FULL_TEXT_SEARCH_TERMS"
	});
}

export function setSort(field) {
	return createNewQuery({
		type: "SET_RESULTS_SORT",
		field: field
	});
}