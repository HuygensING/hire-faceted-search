let initialState = {
	facetTitles: {},
	resultsFound: "Results found",
	showAll: "Show all",
	sortBy: "Sort by"
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_LABELS":
			return {...state, ...action.labels};

		default:
			return state;
	}
}