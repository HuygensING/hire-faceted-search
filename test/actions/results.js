import sinon from "sinon";
import expect from "expect";
import {fetchResults, fetchNextResults, server} from "../../src/actions/results";

describe("results action", () => {
	it("should fetch results", () => {
		let clearListDispatched = false;
		let receiveResultsDispatched = false;
		let getStateCalled = false;

		sinon.stub(server, "performXhr", function(opts, callback){
			if(opts.method === "POST") {
				expect(opts.headers).toEqual({
					"x-dummy-header": "hdr",
					"Content-Type": "application/json"
				});
				expect(opts.url).toEqual("dummy-url/search/path");
				expect(opts.data).toEqual("\"test query\"");
				callback(null, {
					headers: {
						location: "dummy-location"
					}
				}, null);
			} else {
				expect(opts.headers).toEqual({
					"Content-Type": "application/json",
					"x-dummy-header": "hdr"
				});
				expect(opts.url).toEqual("dummy-location?rows=10");
				callback(null, null, JSON.stringify({
					mock: "response"
				}));

			}
		});
		let dispatch = function(opts) {
			if(opts.type === "CLEAR_LIST") {
				clearListDispatched = true;
			}
			if(opts.type === "RECEIVE_RESULTS") {
				receiveResultsDispatched = true;
				expect(opts.response).toEqual({mock: "response"});
			}
		};

		let getState = function() {
			getStateCalled = true;
			return {
				queries: { all: ["test query"]},
				config: {
					headers: {
						"x-dummy-header": "hdr"
					},
					baseURL: "dummy-url/",
					searchPath: "search/path",
					rows: 10
				}
			};
		};

		let fetch = fetchResults();

		fetch(dispatch, getState);
		sinon.assert.calledTwice(server.performXhr);
		server.performXhr.restore();
		expect(clearListDispatched).toEqual(true);
		expect(receiveResultsDispatched).toEqual(true);
		expect(getStateCalled).toEqual(true);
	});

	it("should fetch next results", () => {
		let requestResultsDispatched = false;
		let receiveNextResultsDispatched = false;
		let getStateCalled = false;

		sinon.stub(server, "performXhr", function(opts, callback){
			expect(opts.url).toEqual("dummy-url");
			expect(opts.headers).toEqual({"Content-Type": "application/json"});
			callback(null, null, JSON.stringify({
				mock: "response"
			}));
		});

		let getState = function() {
			getStateCalled = true;
			return {config: {headers: {}}};
		};

		let dispatch = function(opts) {
			if(opts.type === "REQUEST_RESULTS") {
				requestResultsDispatched = true;
			}
			if(opts.type === "RECEIVE_NEXT_RESULTS") {
				receiveNextResultsDispatched = true;
				expect(opts.response).toEqual({mock: "response"});
			}
		};

		let fetch = fetchNextResults("dummy-url");

		fetch(dispatch, getState);

		sinon.assert.calledOnce(server.performXhr);
		server.performXhr.restore();
		expect(requestResultsDispatched).toEqual(true);
		expect(receiveNextResultsDispatched).toEqual(true);
		expect(getStateCalled).toEqual(true);

	});
});