"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _hireRangeSlider = require("hire-range-slider");

var _hireRangeSlider2 = _interopRequireDefault(_hireRangeSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOUSE_DOWN = 0;
var MOUSE_UP = 1;

var RangeFacet = function (_React$Component) {
	_inherits(RangeFacet, _React$Component);

	function RangeFacet(props) {
		_classCallCheck(this, RangeFacet);

		var _this = _possibleConstructorReturn(this, (RangeFacet.__proto__ || Object.getPrototypeOf(RangeFacet)).call(this, props));

		_this.state = _extends({}, _this.propsToState(_this.props));
		return _this;
	}

	_createClass(RangeFacet, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState(this.propsToState(nextProps));
		}
	}, {
		key: "propsToState",
		value: function propsToState(props) {
			var _this2 = this;

			var queryValues = (props.queries.last.facetValues || []).filter(function (x) {
				return x.name === _this2.props.data.name;
			})[0] || {};
			var lowerLimit = queryValues.lowerLimit || props.data.options[0].lowerLimit;
			var upperLimit = queryValues.upperLimit || props.data.options[0].upperLimit;
			return {
				lowerLimit: lowerLimit,
				upperLimit: upperLimit
			};
		}
	}, {
		key: "onRangeChange",
		value: function onRangeChange(range) {
			var lowerBound = this.props.data.options[0].lowerLimit;
			var upperBound = this.props.data.options[0].upperLimit;
			var realRange = upperBound - lowerBound;
			var newState = {
				lowerLimit: Math.floor(range.lowerLimit * realRange) + lowerBound,
				upperLimit: Math.floor(range.upperLimit * realRange) + lowerBound
			};
			if (range.refresh) {
				this.props.onSelectFacetRange(this.props.data.name, newState);
			} else {
				this.setState(newState);
			}
		}
	}, {
		key: "getPercentage",
		value: function getPercentage(key) {
			var lowerBound = this.props.data.options[0].lowerLimit;
			var upperBound = this.props.data.options[0].upperLimit;
			var realRange = upperBound - lowerBound;

			var atRange = this.state[key] - lowerBound;
			return atRange / realRange;
		}
	}, {
		key: "render",
		value: function render() {
			var title = this.props.data.name;
			var facetTitle = this.props.labels.facetTitles.hasOwnProperty(title) ? this.props.labels.facetTitles[title] : title;

			return _react2.default.createElement(
				"li",
				{ className: "hire-facet hire-range-facet" },
				_react2.default.createElement(
					"header",
					null,
					_react2.default.createElement(
						"h3",
						null,
						facetTitle
					)
				),
				_react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(_hireRangeSlider2.default, { lowerLimit: this.getPercentage("lowerLimit"), onChange: this.onRangeChange.bind(this), upperLimit: this.getPercentage("upperLimit") }),
					_react2.default.createElement(
						"label",
						null,
						Math.floor(this.state.lowerLimit * 0.0001)
					),
					_react2.default.createElement(
						"label",
						null,
						Math.floor(this.state.upperLimit * 0.0001)
					)
				)
			);
		}
	}]);

	return RangeFacet;
}(_react2.default.Component);

RangeFacet.propTypes = {
	data: _react2.default.PropTypes.object,
	labels: _react2.default.PropTypes.object,
	onSelectFacetRange: _react2.default.PropTypes.func,
	queries: _react2.default.PropTypes.object
};

exports.default = RangeFacet;