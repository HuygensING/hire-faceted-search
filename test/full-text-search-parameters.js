import React from "react/addons";
import sinon from "sinon";
import FacetedSearch from "../src";
import {server} from "../src/actions/results";

import sd from "skin-deep";

/*eslint no-undef: 0 */
describe("FacetedSearch", function() {
	it("should update the fullTextSearchParameters on receiving next fullTextSearchParameters prop", () => {
		var props = { config: {} };
		let tree = sd.shallowRender(<FacetedSearch {...props}/>);

		// Stub performXhr function of server
		sinon.stub(server, "performXhr", (options, cb) => {
			// perform assertions on options here,
			// optionally invoke cb and do assertion on its results (should be in scope of this test)
			console.log(options, cb);
		});


		props.query = {
			fullTextSearchParameters: [{name: "foo", term: "bar"}]
		};

		tree.reRender(<FacetedSearch {...props}/>);

		let fs = tree.getMountedInstance();

		// always restore a stubbed function at the end of the test
		// (or else it will still be stubbed in a next test)
		server.performXhr.restore();
	});
});