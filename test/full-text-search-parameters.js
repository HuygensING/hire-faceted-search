import React from "react/addons";
import sinon from "sinon";
import expect from "expect";
import FacetedSearch from "../src";
import {server} from "../src/actions/results";

import sd from "skin-deep";

/*eslint no-undef: 0 */
describe("FacetedSearch", function() {
	it("should update the fullTextSearchParameters on receiving next fullTextSearchParameters prop", () => {
		var props = { config: {} };

		// Stub performXhr function of server
		sinon.stub(server, "performXhr", (options, cb) => {
			// perform assertions on options here,
			// optionally invoke cb and do assertion on its results (should be in scope of this test)
			expect(JSON.parse(options.data)).toEqual({
				facetValues: [],
				sortParameters: [],
				term: "",
				fullTextSearchParameters: [{name: "foo", term: "bar"}]
			});
			expect(typeof cb).toEqual("function");
		});

		let tree = sd.shallowRender(<FacetedSearch {...props}/>);

		// shallowRender does not trigger componentDidMount so initial search is not called


		props.query = {
			fullTextSearchParameters: [{name: "foo", term: "bar"}]
		};

		// Render should trigger willComponentUpdate, invoke setQuery and dispatch the new request here
		tree.reRender(<FacetedSearch {...props}/>);

		// assert that the stub was invoked
		sinon.assert.calledOnce(server.performXhr);

		// always restore a stubbed function at the end of the test
		// (or else it will still be stubbed in a next test)
		server.performXhr.restore();
	});
});