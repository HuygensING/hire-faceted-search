import expect from "expect";
import reducer from "../../src/reducers/queries";
import {queryDefaults} from "../../src/defaults";

describe('queries reducer', () => {

	it("should handle SET_QUERY_DEFAULTS", () => {
		const queryProps = {
			some: "extra",
			props: "here"
		};

		const expectedQueryDefaults = Object.assign(queryDefaults, queryProps);

		const nextState = reducer(undefined, {
			type: "SET_QUERY_DEFAULTS",
			queryDefaults: queryProps
		});

		expect(nextState).toEqual({
			all: [expectedQueryDefaults],
			default: expectedQueryDefaults,
			last: expectedQueryDefaults
		});
	});


	it("should handle SET_RESULTS_SORT", () => {
		let state = {
			all: [],
			last: {
				sortParameters: [
					{fieldname: "zzOnBottom"},
					{fieldname: "inTheMiddle"},
					{fieldname: "onTop"}
				]
			}
		};

		expect(reducer(state, {
			type: "SET_RESULTS_SORT",
			field: "onTop"
		})).toEqual({
			all: [{ sortParameters: [ { fieldname: "onTop" }, { fieldname: "inTheMiddle" }, { fieldname: "zzOnBottom" } ] } ],
			last: { sortParameters: [ { fieldname: "onTop" }, { fieldname: "inTheMiddle" }, { fieldname: "zzOnBottom" } ] } }
		);
	});


	it("should handle initialize the sortparameters with RECEIVE_RESULTS", () => {
//		if(state.last.sortParameters.length === 0)
		let state = {
			all: [],
			last: {sortParameters: []}
		};

		expect(reducer(state, {
			type: "RECEIVE_RESULTS",
			response: {sortableFields: ["foo", "bar", "baz"]}
		})).toEqual({
			all: [{sortParameters: [{fieldname: "foo", direction: "asc"}, {fieldname: "bar", direction: "asc"}, {fieldname: "baz", direction: "asc"}]}],
			last: {sortParameters: [{fieldname: "foo", direction: "asc"}, {fieldname: "bar", direction: "asc"}, {fieldname: "baz", direction: "asc"}]}
		});

//		else
		let state1 = {
			all: [{sortParameters: ["foo"]}],
			last: {sortParameters: ["foo"]}
		};

		expect(reducer(state1, {
			type: "RECEIVE_RESULTS"
		})).toEqual({
			all: [{sortParameters: ["foo"]}],
			last: {sortParameters: ["foo"]}
		});
	});

	it("should REMOVE_FACET_VALUE but keep other facet values in the same facet name", () => {
		let initialFacets = {
			facetValues: [
				{name: "facet1", values: ["a", "b", "c"]},
				{name: "facet2", values: ["d", "e"]}
			]
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "REMOVE_FACET_VALUE",
			facetName: "facet1",
			value: "b"
		};

		let expectedFacets = {
			facetValues: [
				{name: "facet2", values: ["d", "e"]},
				{name: "facet1", values: ["a", "c"]}
			]
		};

		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});

	it("should REMOVE_FACET_VALUE and facet when list is empty", () => {
		let initialFacets = {
			facetValues: [
				{name: "facet1", values: ["a"]}
			]
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "REMOVE_FACET_VALUE",
			facetName: "facet1",
			value: "a"
		};

		let expectedFacets = {
			facetValues: []
		};

		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});


	it("should ADD_FACET_VALUE with existing facets", () => {
		let initialFacets = {
			facetValues: [
				{name: "facet1", values: ["b", "c"]},
				{name: "facet2", values: ["d", "e"]}
			]
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "ADD_FACET_VALUE",
			facetName: "facet1",
			value: "a"
		};

		let expectedFacets = {
			facetValues: [
				{name: "facet2", values: ["d", "e"]},
				{name: "facet1", values: ["b", "c", "a"]}
			]
		};
		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});

	it("should ADD_FACET_VALUE without existing facets", () => {
		let initialFacets = {
			facetValues: []
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "ADD_FACET_VALUE",
			facetName: "facet1",
			value: "a"
		};

		let expectedFacets = {
			facetValues: [
				{name: "facet1", values: ["a"]}
			]
		};
		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});

	it("should ADD_FACET_VALUE with existing other facet name", () => {
		let initialFacets = {
			facetValues: [{name: "facet2", values: ["d", "e"]}]
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "ADD_FACET_VALUE",
			facetName: "facet1",
			value: "a"
		};

		let expectedFacets = {
			facetValues: [
				{name: "facet2", values: ["d", "e"]},
				{name: "facet1", values: ["a"]}
			]
		};
		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});


	it("should overwrite the facetValues with SET_FACET_VALUES", () => {
		let initialFacets = {
			facetValues: [{name: "facet2", values: ["d", "e"]}]
		};
		let state = {
			last: initialFacets,
			all: [initialFacets]
		};
		let action = {
			type: "SET_FACET_VALUES",
			facetValues: [{name: "facet1", values: ["a", "b"]}]
		};

		let expectedFacets = {
			facetValues: [
				{name: "facet1", values: ["a", "b"]}
			]
		};
		let expectedState = {
			all: [initialFacets, expectedFacets],
			last: expectedFacets
		};

		expect(reducer(state, action)).toEqual(expectedState);
	});

	it("should handle CHANGE_SEARCH_TERM", () => {
		let state = {
			all: [{term: "foo"}],
			last: {term: "foo"}
		};
		let expectedState = {
			all: [{term: "foo"}, {term: "bar"}],
			last: {term: "bar"}
		};
		expect(reducer(state, {
			type: "CHANGE_SEARCH_TERM",
			value: "bar"
		})).toEqual(expectedState);
	});

	it("should handle CHANGE_FULL_TEXT_SEARCH_TERM overwrite", () => {
		let state = {
			all: [{fullTextSearchParameters: [{name: "fieldname", term: ":val:"}]}],
			last: {fullTextSearchParameters: [{name: "fieldname", term: ":val:"}]}
		};
		let expectedState = {
			all: [{fullTextSearchParameters: [{name: "fieldname", term: ":val:"}]}, {fullTextSearchParameters: [{name: "fieldname", term: ":newVal:"}]}],
			last: {fullTextSearchParameters: [{name: "fieldname", term: ":newVal:"}]}
		};
		expect(reducer(state, {
			type: "CHANGE_FULL_TEXT_SEARCH_TERM",
			field: "fieldname",
			value: ":newVal:"
		})).toEqual(expectedState);
	});

	it("should handle SET_FULL_TEXT_SEARCH_TERMS overwrite", () => {
		let state = {
			all: [{fullTextSearchParameters: [{name: "fieldname", term: ":val:"}, {name: "otherField", term: ":otherVal:"}]}],
			last: {fullTextSearchParameters: [{name: "fieldname", term: ":val:"}, {name: "otherField", term: ":otherVal:"}]}
		};
		let expectedState = {
			all: [
				{fullTextSearchParameters: [{name: "fieldname", term: ":val:"}, {name: "otherField", term: ":otherVal:"}]},
				{fullTextSearchParameters: [{name: "fieldname", term: ":newVal:"}]}
			],
			last: {fullTextSearchParameters: [{name: "fieldname", term: ":newVal:"}]}
		};
		expect(reducer(state, {
			type: "SET_FULL_TEXT_SEARCH_TERMS",
			field: "fieldname",
			fullTextSearchParameters: [{name: "fieldname", term: ":newVal:"}]
		})).toEqual(expectedState);
	});

	it("should handle REMOVE_FULL_TEXT_SEARCH_TERMS overwrite", () => {
		let state = {
			all: [{fullTextSearchParameters: [{name: "fieldname", term: ":val:"}, {name: "otherField", term: ":otherVal:"}]}],
			last: {fullTextSearchParameters: [{name: "fieldname", term: ":val:"}, {name: "otherField", term: ":otherVal:"}]}
		};
		let expectedState = {
			all: [
				{fullTextSearchParameters: [{name: "fieldname", term: ":val:"}, {name: "otherField", term: ":otherVal:"}]},
				{}
			],
			last: {}
		};
		expect(reducer(state, {
			type: "REMOVE_FULL_TEXT_SEARCH_TERMS"
		})).toEqual(expectedState);
	});


	it("should handle CHANGE_FULL_TEXT_SEARCH_TERM remove", () => {
		let state = {
			all: [{fullTextSearchParameters: [{name: "fieldname", term: ":val:"}]}],
			last: {fullTextSearchParameters: [{name: "fieldname", term: ":val:"}]}
		};
		let expectedState = {
			all: [{fullTextSearchParameters: [{name: "fieldname", term: ":val:"}]}, {}],
			last: {}
		};
		expect(reducer(state, {
			type: "CHANGE_FULL_TEXT_SEARCH_TERM",
			field: "fieldname",
			value: ""
		})).toEqual(expectedState);
	});

	it("should handle CHANGE_FULL_TEXT_SEARCH_TERM add field", () => {
		let state = {
			all: [{fullTextSearchParameters: [{name: "fieldname", term: ":val:"}]}],
			last: {fullTextSearchParameters: [{name: "fieldname", term: ":val:"}]}
		};
		let expectedState = {
			all: [{fullTextSearchParameters: [{name: "fieldname", term: ":val:"}]}, {fullTextSearchParameters: [{name: "fieldname", term: ":val:"}, {name: "fieldname2", term: ":newVal:"}]}],
			last: {fullTextSearchParameters: [{name: "fieldname", term: ":val:"}, {name: "fieldname2", term: ":newVal:"}]}
		};
		expect(reducer(state, {
			type: "CHANGE_FULL_TEXT_SEARCH_TERM",
			field: "fieldname2",
			value: ":newVal:"
		})).toEqual(expectedState);
	});


	it("should handle NEW_SEARCH", () => {

		let state = {
			default: {
				"facetValues": [],
				"sortParameters": [],
				"term": ""
			},
			all: [{
				"facetValues": ["foo", "bar"],
				"sortParameters": ["bar", "foo"],
				"term": "baz"
			}],
			last: {
				"facetValues": ["foo", "bar"],
				"sortParameters": ["bar", "foo"],
				"term": "baz"
			}
		};

		let expectedState = {
			default: {
				"facetValues": [],
				"sortParameters": [],
				"term": ""
			},
			all: [state.last, state.default],
			last: state.default
		};

		expect(reducer(state, {type: "NEW_SEARCH"})).toEqual(expectedState);
	});
});