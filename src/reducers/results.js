let updateFacetsWithReceivedCounts = function(initFacets, receivedFacets) {
	receivedFacets = receivedFacets || [];
	receivedFacets = receivedFacets.reduce((prev, current) => {
		prev[current.name] = current;

		return prev;
	}, {});

	return initFacets.map((facet) => {
		let options = facet.options.map((option) => {
			let count = 0;

			if (receivedFacets.hasOwnProperty(facet.name)) {
				let found = receivedFacets[facet.name].options.filter((receivedOption) =>
					option.name === receivedOption.name
				);

				if (found.length) {
					count = found[0].count;
				}
			}

			option.count = count;

			return option;
		});

		return {...facet, ...{options: options}};
	});
};

let addResponseToState = function(state, response) {
	let s = {...state, ...{
		all: [...state.all, response],
		last: response,
		requesting: false
	}};


	return s;
};

let initialState = {
	all: [],
	facets: {},
	first: null,
	last: null,
	requesting: false,
	searchId: null
};

let createFirstResultsState = (result, searchId) => {
	return {
		...addResponseToState(initialState, result),
		first: result,
		last: result,
		searchId: searchId
	};
};

export {createFirstResultsState};

export default function(state=initialState, action) {
	switch (action.type) {
		case "REQUEST_RESULTS":
			state = {...state, ...{requesting: true}};

			break;

		case "CLEAR_LIST":
			let newState = state;

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

			let response = {...action.response, ...{
				facets: updateFacetsWithReceivedCounts(
					state.first.facets,
					action.response.facets
				)
			}};

			state = {
				...addResponseToState(state, response),
					searchId: action.searchId
			};

			break;

		case "RECEIVE_NEXT_RESULTS":
			let withConcatResults = {...action.response, ...{
				refs: [...state.last.refs, ...action.response.refs],
				facets: updateFacetsWithReceivedCounts(
					state.last.facets,
					action.response.facets
				)
			}};

			state = {
				...addResponseToState(state, withConcatResults),
				searchId: action.searchId
			};

			break;
	}

	return state;
}