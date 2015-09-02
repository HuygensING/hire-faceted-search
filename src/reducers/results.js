
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
	requesting: false
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "REQUEST_RESULTS":
			return {...state, ...{requesting: true}};

		case "CLEAR_LIST":
			let newState = state;
			if(newState.last) {
				newState.last.refs = [];
				newState.requesting = true;
			}
			return newState;

		case "RECEIVE_RESULTS":
			if (state.first == null) {
				return {...addResponseToState(state, action.response), ...{first: action.response}};
			}

			let response = {...action.response, ...{
				facets: updateFacetsWithReceivedCounts(
					state.first.facets,
					action.response.facets
				)
			}};

			return addResponseToState(state, response);

		case "RECEIVE_NEXT_RESULTS":
			let withConcatResults = {...action.response, ...{
				refs: [...state.last.refs, ...action.response.refs]
			}};
			return addResponseToState(state, withConcatResults);

		default:
			return state;
	}
}