import {queryDefaults} from "../defaults";

let removeFacetValue = function(facetValues, name, value) {
	let foundFacetValue = facetValues.filter((facetValue) =>
		facetValue.name === name
	);

	let otherFacetValues = facetValues.filter((facetValue) =>
		facetValue.name !== name
	);
	if(foundFacetValue[0].values) {
		return (foundFacetValue[0].values.length > 1) ?
			otherFacetValues.concat({
				name: name,
				values: foundFacetValue[0].values.filter((v) => v !== value)
			}) :
			otherFacetValues;
	} else {
		return otherFacetValues;
	}
};

let addFacetValue = function(facetValues, name, value) {
	let foundFacetValue = facetValues.filter((facetValue) =>
		facetValue.name === name
	);

	let otherFacetValues = facetValues.filter((facetValue) =>
		facetValue.name !== name
	);

	let selectedValues = (foundFacetValue.length) ?
		foundFacetValue[0].values.concat([value]) :
		[value];

	let newFacetValue = {
		name: name,
		values: selectedValues
	};

	return otherFacetValues.concat(newFacetValue);
};

let addRangeFacetValue = function(facetValues, name, value) {
	let found = false;
	for(let i = 0; i < facetValues.length; i++) {
		if(facetValues[i].name === name) {
			facetValues[i] = {name: name, ...value};
			found = true;
			break;
		}
	}
	if(!found) {
		facetValues = [...facetValues, {name: name, ...value}];
	}

	return facetValues;
};

let addQueryToState = function(state, query) {
	return {...state, ...{
			all: [...state.all, query],
			last: query
		}
	};
};

let setFullTextSearchParameter = function(field, value, last = []) {
	let current = last.filter((param) => param.name !== field);
	if(value.length) {
		current.push({name: field, term: value});
	}
	return current;
};

const initialState = {
	all: [queryDefaults],
	default: queryDefaults,
	last: queryDefaults
};

export default function(state=initialState, action) {
	let query;

	switch (action.type) {
		// Override query defaults when props.query is set.
		case "SET_INITIAL_QUERY":
			let initialQuery = {...queryDefaults, ...action.initialQuery};

			state = {...state, ...{
				all: [initialQuery],
				last: initialQuery
			}};

			break;

		case "SET_RESULTS_SORT":
			query = {...state.last, ...{sortParameters: [{fieldname: action.field, direction: "asc"}]}};

			state = addQueryToState(state, query);

			break;

		case "REMOVE_FACET_VALUE":
			query = {...state.last, ...{
				facetValues: removeFacetValue(state.last.facetValues, action.facetName, action.value)
			}};

			state = addQueryToState(state, query);

			break;

		case "ADD_FACET_VALUE":
			query = {...state.last, ...{
				facetValues: addFacetValue(state.last.facetValues, action.facetName, action.value)
			}};
			state = addQueryToState(state, query);

			break;

		case "ADD_FACET_RANGE":
			query = {...state.last, ...{
				facetValues: addRangeFacetValue(state.last.facetValues, action.facetName, action.value)
			}};
			state = addQueryToState(state, query);

			break;

		case "SET_FACET_VALUES":
			query = {...state.last, ...{
				facetValues: action.facetValues
			}};
			state = addQueryToState(state, query);

			break;

		case "CHANGE_SEARCH_TERM":
			query = {...state.last, ...{term: action.value}};
			state = addQueryToState(state, query);

			break;

		case "CHANGE_FULL_TEXT_SEARCH_TERM":
			query = {...state.last, ...{
				fullTextSearchParameters: setFullTextSearchParameter(action.field, action.value, state.last.fullTextSearchParameters)
			}};
			if (!query.fullTextSearchParameters.length) { delete query.fullTextSearchParameters; }
			state = addQueryToState(state, query);

			break;

		case "SET_FULL_TEXT_SEARCH_TERMS":
			query = {...state.last, ...{
				fullTextSearchParameters: action.fullTextSearchParameters
			}};
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
}
