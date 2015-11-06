import React from "react/addons";
import expect from "expect";
import TextSearch from "../../src/components/text-search";
import SearchIcon from "../../src/components/icons/search";

const { TestUtils } = React.addons;

describe("TextSearch", () => {

	it("should render properly", () => {

		function setup() {
			let props = {
				value: null,
				onChangeSearchTerm: expect.createSpy(),
				labels: {facetTitles: {term: "Title"}}
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
		expect(output.props.children.length).toBe(3);
		let [header, input, searchDiv] = output.props.children;
		expect(header.type).toBe("header");
		expect(input.type).toBe("input");
		expect(input.props.onKeyDown).toBeA(Function);
		expect(input.props.onChange).toBeA(Function);
		expect(input.props.value).toBe("");
		expect(header.props.children.type).toBe("h3");
		expect(header.props.children.props.children).toBe("Title");

		expect(searchDiv.type).toBe("div");
		expect(searchDiv.props.className).toBe("search-icon");
		expect(searchDiv.props.onClick).toBeA(Function);
		input.props.onKeyDown({target: {value: "test term"}});

		let iconw = searchDiv.props.children;
		let icon = iconw.props.children;
		expect(iconw.props.className).toBe("center-vertical");
		expect(icon.type).toBe(SearchIcon);

	});

});