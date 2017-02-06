"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _hireFormsInput = require("hire-forms-input");

var _hireFormsInput2 = _interopRequireDefault(_hireFormsInput);

var _filter = require("../icons/filter");

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterMenu = function (_React$Component) {
	_inherits(FilterMenu, _React$Component);

	function FilterMenu(props) {
		_classCallCheck(this, FilterMenu);

		var _this = _possibleConstructorReturn(this, (FilterMenu.__proto__ || Object.getPrototypeOf(FilterMenu)).call(this, props));

		_this.state = {
			active: false,
			value: ""
		};
		return _this;
	}

	_createClass(FilterMenu, [{
		key: "handleInputChange",
		value: function handleInputChange(value, ev) {
			this.setState({
				value: value
			});

			this.props.onChange(value);
		}
	}, {
		key: "handleInputBlur",
		value: function handleInputBlur() {
			this.setState({
				active: false,
				value: ""
			});
		}
	}, {
		key: "handleInputFocus",
		value: function handleInputFocus() {
			this.setState({
				active: true
			});
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: (0, _classnames2.default)("hire-faceted-search-filter-menu", { active: this.state.active }) },
				_react2.default.createElement(_hireFormsInput2.default, {
					onBlur: this.handleInputBlur.bind(this),
					onChange: this.handleInputChange.bind(this),
					onFocus: this.handleInputFocus.bind(this),
					value: this.state.value }),
				_react2.default.createElement(_filter2.default, null)
			);
		}
	}]);

	return FilterMenu;
}(_react2.default.Component);

FilterMenu.defaultProps = {};

FilterMenu.propTypes = {
	onChange: _react2.default.PropTypes.func.isRequired
};

exports.default = FilterMenu;