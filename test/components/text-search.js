import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import React from "react/addons";
import expect from "expect";

const { TestUtils } = React.addons;

describe("TextSearch", () => {
	before(() => {
		let jsdom = require('jsdom');
		global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
		ExecutionEnvironment.canUseDOM = true;
	});

	it("should render properly", () => {
		// Can only import elements with insertCss after document is exposed as global
		let TextSearch = require("../../src/components/text-search");
		let SearchIcon = require("../../src/components/icons/search");

		function setup() {
			let props = {
				value: null,
				onChangeSearchTerm: expect.createSpy()
			};
			let renderer = TestUtils.createRenderer();
			renderer.render(<TextSearch {...props} />);
			let output = renderer.getRenderOutput();

			return {
				props,
				output,
				renderer
			};
		}


		const { output, props } = setup();
		expect(output.type).toBe("li");
		expect(output.props.className).toBe("hire-faceted-search-text-search");
		expect(output.props.children.length).toBe(2);
		let [input, searchDiv] = output.props.children;
		expect(input.type).toBe("input");
		expect(input.props.onKeyDown).toBeA(Function);
		expect(input.props.onChange).toBeA(Function);
		expect(input.props.value).toBe("");

		expect(searchDiv.type).toBe("div");
		expect(searchDiv.props.className).toBe("search-icon");
		expect(searchDiv.props.onClick).toBeA(Function);
		input.props.onKeyDown({target: {value: "test term"}});
		searchDiv.props.onClick();
		expect(props.onChangeSearchTerm.calls.length).toBe(1);

		let iconw = searchDiv.props.children;
		let icon = iconw.props.children;
		expect(iconw.props.className).toBe("center-vertical");
		expect(icon.type).toBe(SearchIcon);

	});

});