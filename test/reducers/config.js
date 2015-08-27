import expect from "expect";
import reducer from "../../src/reducers/config";

describe('config reducer', () => {

	it('should handle SET_CONFIG_DEFAULTS adding the rows prop as 50', () => {
		expect(
			reducer({local: "state"}, {
				type: "SET_CONFIG_DEFAULTS",
				config: {foo: "bar", baz: "bax"}
			})
		).toEqual({
			local: "state",
			foo: "bar",
			baz: "bax",
			rows: 50
		});
	});

	it('should allow overriding of the rows property', () => {
		expect(
			reducer({}, {
				type: "SET_CONFIG_DEFAULTS",
				config: {rows: 30}
			})
		).toEqual({
			rows: 30
		});
	});
});