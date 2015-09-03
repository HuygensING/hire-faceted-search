import expect from "expect";
import reducer from "../../src/reducers/results";

describe('results reducer', () => {

	it('should have the correct initial state', () => {
		expect(
			reducer(undefined, {})
		).toEqual({
			all: [],
			facets: {},
			first: null,
			last: null,
			requesting: false
		});
	});

	it('should handle REQUEST_RESULTS by setting requesting to true', () => {
		expect(
			reducer({local: "state"}, {
				type: "REQUEST_RESULTS"
		})).toEqual({
			local: "state",
			requesting: true
		});
	});

	it('should handle CLEAR_LIST by emptying results and refs of last result state', () => {
		expect(reducer({
			last: {
				refs: ["arr", "with", "content"] /*,
				results: ["arr", "with", "content"]*/
			},
			requesting: false
		}, {type: "CLEAR_LIST"})).toEqual({
			last: {
				refs: [] /*,
				results: []*/
			},
			requesting: true
		});
	});


	it('should handle RECEIVE_NEXT_RESULTS by adding the refs and results to the last state and pushing the new state to all', () => {
		expect(reducer({
			all: [{/*results: ["old", "results"],*/ refs: ["old", "refs"]}],
			last: { /*results: ["old", "results"],*/ refs: ["old", "refs"]},
			requesting: true
		}, {
			type: "RECEIVE_NEXT_RESULTS",
			response: {/*results: ["new", "results"],*/ refs: ["new", "refs"]}
		})).toEqual({
			all: [
				{ /*results: ["old", "results"],*/ refs: ["old", "refs"]},
				{ /*results: ["old", "results", "new", "results"], */ refs: ["old", "refs", "new", "refs"]}
			],
			last: { /*results: ["old", "results", "new", "results"], */ refs: ["old", "refs", "new", "refs"]},
			requesting: false
		});
	});

	it('should handle RECEIVE_RESULTS by setting the first results, last results, facets and all', () => {
		let state = {requesting: true, all: [], first: null};
		let response = {
			refs: ["a ref"],
			results: ["a result"],
			facets: {a: "facet"}
		};
		let expectedState = {
			requesting: false,
			first: response,
			all: [response],
			last: response
		};
		expect(reducer(state, {type: "RECEIVE_RESULTS", response: response})).toEqual(expectedState);
	});

	it('should update facet counts with RECEIVE_RESULTS', () => {
		let state = {
			all: [],
			first: {
				facets: [
					{name: "facetA", options: [{name: "foo", count: 5}, {name: "bar", count: 3}]},
					{name: "facetB", options: [{name: "fooB", count: 5}, {name: "barB", count: 3}]}
				]
			},
			requesting: true
		};
		let response = {
			facets: [
				{name: "facetA", options: [{name: "foo", count: 3}]},
				{name: "facetB", options: [{name: "fooB", count: 2}, {name: "barB", count: 1}]}
			]
		};
		let expectedFacets = [
				{name: "facetA", options: [{name: "foo", count: 3}, {name: "bar", count: 0}] },
				{name: "facetB", options: [{name: "fooB", count: 2}, {name: "barB", count: 1}]}
		];
		let expectedState = {
			all: [{facets: expectedFacets}],
			first: state.first,
			last: {facets: expectedFacets},
			requesting: false
		};


		expect(reducer(state, {type: "RECEIVE_RESULTS", response: response})).toEqual(expectedState);
	});
});