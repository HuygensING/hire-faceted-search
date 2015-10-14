import React from "react/addons";
import sd from "skin-deep";
import sinon from "sinon";
import expect from "expect";

describe("FacetedSearch", function() {
	before(() => {
		let jsdom = require('jsdom');
		global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
	});

	it("should update the query with componentWillReceiveProps", function() {
		const FacetedSearch = require("../src/index");

		const tree = sd.shallowRender(<FacetedSearch config={{}} />);
		const search = tree.getMountedInstance();
		const labels = search.state.labels;

		const localDispatch = function(dispatchData) {
			if(typeof dispatchData === "object") {
				expect(dispatchData).toEqual({
					type: "SET_FACET_VALUES",
					facetValues: [{name: "foo", values: ["bar"]}]
				});
			}
		};

		sinon.stub(search.store, "dispatch", function(cb) {
			cb(localDispatch);
		});

		search.componentWillReceiveProps({
			labels: labels,
			query: {facetValues: [{name: "foo", values: ["bar"]}]}
		});

		sinon.assert.calledOnce(search.store.dispatch);
		search.store.dispatch.restore();
	});

	it("should not update the query with componentWillReceiveProps when facetValues are the same", function() {
		const FacetedSearch = require("../src/index");

		const tree = sd.shallowRender(<FacetedSearch config={{}} />);
		const search = tree.getMountedInstance();
		const labels = search.state.labels;
		const query = {...search.state.queries.last, sortParameters: "something different", term: "something else"};
		sinon.stub(search.store, "dispatch");

		search.componentWillReceiveProps({
			labels: labels,
			query: query
		});
		sinon.assert.notCalled(search.store.dispatch);
		search.store.dispatch.restore();
	});
});