import React from "react/addons";
import sd from "skin-deep";
import sinon from "sinon";
import expect from "expect";
import {configDefaults, labelsDefaults, queryDefaults} from "../src/defaults";


let getTree = (props={}) => {
	const FacetedSearch = require("../src").default;

	// Make sure config is defined, because it is a required prop.
	props = Object.assign({config: {}}, props);

	return sd.shallowRender(<FacetedSearch {...props}/>);
};

let getRenderOutput = (props) =>
	getTree(props).getRenderOutput();

let getMountedInstance = (props) =>
	getTree(props).getMountedInstance();


describe("FacetedSearch", function() {
	before(() => {
		this.timeout(5000);
		let jsdom = require("jsdom");
		global.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
	});

	it("should update the facetValues in the query prop with componentWillReceiveProps", function() {
		this.timeout(5000);
		const FacetedSearch = require("../src").default;

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
		this.timeout(5000);
		const FacetedSearch = require("../src").default;

		const tree = sd.shallowRender(<FacetedSearch config={{}} />);
		const search = tree.getMountedInstance();
		const labels = search.state.labels;
		const query = {...search.state.queries.last, facetValues: [{name: "foo", values: ["bar"]}]};
		search.state.queries.last.facetValues = [{name: "foo", values: ["bar"]}];
		sinon.stub(search.store, "dispatch");

		search.componentWillReceiveProps({
			labels: labels,
			query: query
		});
		sinon.assert.notCalled(search.store.dispatch);
		search.store.dispatch.restore();
	});

	it("should not update the fullTextSearchParameters with componentWillReceiveProps when fullTextSearchParameters are the same", function() {
		this.timeout(5000);
		const FacetedSearch = require("../src").default;

		const tree = sd.shallowRender(<FacetedSearch config={{}} />);
		const search = tree.getMountedInstance();
		const labels = search.state.labels;
		const query = {...search.state.queries.last, fullTextSearchParameters: [{name: "foo", term: "bar"}]};
		search.state.queries.last.fullTextSearchParameters = [{name: "foo", term: "bar"}];
		sinon.stub(search.store, "dispatch");

		search.componentWillReceiveProps({
			labels: labels,
			query: query
		});
		sinon.assert.notCalled(search.store.dispatch);
		search.store.dispatch.restore();
	});

	// it("should update the fullTextSearchParameters in the query prop with componentWillReceiveProps", function() {
	// 	this.timeout(5000);
	// 	const FacetedSearch = require("../src").default;

	// 	const tree = sd.shallowRender(<FacetedSearch config={{}} />);
	// 	const search = tree.getMountedInstance();
	// 	const labels = search.state.labels;

	// 	const localDispatch = function(dispatchData) {
	// 		if(typeof dispatchData === "object") {
	// 			expect(dispatchData).toEqual({
	// 				type: "SET_FULL_TEXT_SEARCH_TERMS",
	// 				fullTextSearchParameters: [{name: "foo", term: "bar"}]
	// 			});
	// 		}
	// 	};

	// 	sinon.stub(search.store, "dispatch", function(cb) {
	// 		cb(localDispatch);
	// 	});

	// 	search.componentWillReceiveProps({
	// 		labels: labels,
	// 		query: {fullTextSearchParameters: [{name: "foo", term: "bar"}]}
	// 	});

	// 	sinon.assert.calledOnce(search.store.dispatch);
	// 	search.store.dispatch.restore();
	// });

	it("should unset the fullTextSearchParameters when an empty array is passed through the query prop", function() {
		this.timeout(5000);
		const FacetedSearch = require("../src").default;

		const tree = sd.shallowRender(<FacetedSearch config={{}} />);
		const search = tree.getMountedInstance();
		const labels = search.state.labels;
		search.state.queries.last.fullTextSearchParameters = ":having_a_value:";

		const localDispatch = function(dispatchData) {
			if(typeof dispatchData === "object") {
				expect(dispatchData).toEqual({
					type: "REMOVE_FULL_TEXT_SEARCH_TERMS"
				});
			}
		};

		sinon.stub(search.store, "dispatch", function(cb) {
			cb(localDispatch);
		});

		search.componentWillReceiveProps({
			labels: labels,
			query: {fullTextSearchParameters: []}
		});

		sinon.assert.calledOnce(search.store.dispatch);
		search.store.dispatch.restore();
	});

	it("should add a custom className when given als prop", () => {
		const fs = getRenderOutput({className: "custom-classname"});

		expect(fs.props.className).toEqual("hire-faceted-search custom-classname");
	});

	it("should add config prop to default config", () => {
		const configProp = {
			rows: 51,
			test: 3
		};
		const expectedConfig = Object.assign(configDefaults, configProp);
		const fs = getMountedInstance({config: configProp});

		expect(fs.state.config).toEqual(expectedConfig);
	});

	it("should add labels prop to default labels", () => {
		const labelsProp = {
			newSearch: "Noaw seersh",
			showAll: "Shawl oawhl"
		};
		const expectedLabels = Object.assign(labelsDefaults, labelsProp);
		const fs = getMountedInstance({labels: labelsProp});

		expect(fs.state.labels).toEqual(expectedLabels);
	});

	it("should have default query when no queryDefaults are passed as props", () => {
		const fs = getMountedInstance();

		expect(fs.state.queries.default).toEqual(queryDefaults);
	});
});