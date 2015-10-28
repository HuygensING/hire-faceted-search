var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
import sinon from "sinon";
import FacetedSearch from "../src";
var shallowRenderer = TestUtils.createRenderer();
import {server} from "../src/actions/results";

import sd from "skin-deep";


describe("FacetedSearch", function() {
	// it("should update the fullTextSearchParameters on receiving next fullTextSearchParameters prop", () => {
	// 	var props = { config: {} };
	// 	let tree = sd.shallowRender(<FacetedSearch {...props}/>)

	// 	props.query = {
	// 		fullTextSearchParameters: [{name: "foo", term: "bar"}]
	// 	};

	// 	tree.reRender(<FacetedSearch {...props}/>)

	// 	let fs = tree.getMountedInstance();

	// 	// Test fails on xhr.open...
	// });
});