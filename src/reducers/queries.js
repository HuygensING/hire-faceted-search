let removeFacetValue = function(facetValues, name, value) {
	let foundFacetValue = facetValues.filter((facetValue) =>
		facetValue.name === name
	);

	let otherFacetValues = facetValues.filter((facetValue) =>
		facetValue.name !== name
	);

	return (foundFacetValue[0].values.length > 1) ?
		otherFacetValues.concat({
			name: name,
			values: foundFacetValue[0].values.filter((v) => v !== value)
		}) :
		otherFacetValues;
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

let addQueryToState = function(state, query) {
	return {...state, ...{
			all: [...state.all, query],
			last: query
		}
	};
};

let initialState = {
	all: [],
	default: {
		"facetValues": [],
		"searchInAnnotations": true,
		"searchInTranscriptions": true,
		"term": "",
		"textLayers": ["Diplomatic", "Opmerkingen en verwijzingen", "Comments and References", "Transcription", "Transcripción", "Transcriptie", "Vertaling", "Translation", "Traducción", "Comentarios y referencias"]
	},
	last: null
};

export default function(state=initialState, action) {
	let query;

	switch (action.type) {
		case "SET_QUERY_DEFAULTS":
			let defaultModel =  {...initialState.default, ...{
				resultFields: action.config.levels,
				sortParameters: action.config.levels.map((level) => {
					return {
						fieldname: level,
						direction: "asc"
					};
				})
			}};

			return {...state, ...{
				all: [defaultModel],
				default: defaultModel,
				last: defaultModel
			}};

		case "SET_RESULTS_SORT":
			let sortParameters = state.last.sortParameters.sort((valA, valB) => {
				if (valA.fieldname === action.field) { return -1; }
				if (valB.fieldname === action.field) { return 1; }
				if (valA.fieldname < valB.fieldname) { return -1; }
				if (valA.fieldname > valB.fieldname) { return 1; }

				return 0;
			});

			query = {...state.last, ...{sortParameters: sortParameters}};

			return addQueryToState(state, query);

		case "REMOVE_FACET_VALUE":
			query = {...state.last, ...{
				facetValues: removeFacetValue(state.last.facetValues, action.facetName, action.value)
			}};

			return addQueryToState(state, query);

		case "ADD_FACET_VALUE":
			query = {...state.last, ...{
				facetValues: addFacetValue(state.last.facetValues, action.facetName, action.value)
			}};

			return addQueryToState(state, query);

		case "CHANGE_SEARCH_TERM":
			query = {...state.last, ...{term: action.value}};

			return addQueryToState(state, query);

		case "RESET":
			return addQueryToState(state, state.default);

		default:
			return state;
	}
}