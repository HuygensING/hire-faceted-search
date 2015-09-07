import expect from "expect";
import React from 'react/addons';
import Result from '../../../src/components/results/result';

const { TestUtils } = React.addons;

function setup() {
	let onSelect = function(sel) { return sel; };
	let props = {
		metadataList: ["bar", "foo"],
		data: {
			data: {
				foo: "fooVal",
				bar: "barVal",
				doNotShow: "notShown"
			},
			displayName: "display title"
		},
		labels: {
			foo: "Foo Label"
		},
		onSelect: onSelect
	};
	let renderer = TestUtils.createRenderer();
	renderer.render(<Result {...props} />);
	let output = renderer.getRenderOutput();

	return {
		props,
		output,
		renderer
	};
}

describe('Result', () => {
	it("should render correctly", () => {
		const { output } = setup();

		expect(output.type).toBe("li");
		expect(output.props.onClick).toBeA(Function);
		expect(output.props.onClick()).toEqual({
			data: {
				foo: "fooVal",
				bar: "barVal",
				doNotShow: "notShown"
			},
			displayName: "display title"
		});
		let [label, ul] = output.props.children;
		expect(label.type).toBe("label");
		expect(ul.type).toBe("ul");
		expect(label.props.children).toBe("display title");
		expect(ul.props.children.length).toBe(2);
		let [barItem, fooItem] = ul.props.children;
		let [barLabel, barSpan] = barItem.props.children;
		let [fooLabel, fooSpan] = fooItem.props.children;
		expect(barLabel.type).toBe("label");
		expect(barLabel.props.children).toBe("bar");
		expect(fooLabel.type).toBe("label");
		expect(fooLabel.props.children).toBe("Foo Label");
		expect(fooSpan.type).toBe("span");
		expect(barSpan.type).toBe("span");
		expect(fooSpan.props.children).toBe("fooVal");
		expect(barSpan.props.children).toBe("barVal");
	});
});