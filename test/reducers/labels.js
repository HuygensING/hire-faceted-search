import expect from "expect";
import reducer from "../../src/reducers/labels";

describe('labels reducer', () => {
	it('should have the correct initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual({
			facetTitles: {},
			newSearch: "New search",
			resultsFound: "results",
			showAll: "Show all",
			sortBy: "Sort by"
		});
	});


	it('should handle SET_LABELS', () => {
		expect(
			reducer({initial: "state"}, {
				type: "SET_LABELS",
				labels: {foo: "bar", baz: "bax"}
			})
		).toEqual({
			initial: "state",
			foo: "bar",
			baz: "bax"
		});
	});
});