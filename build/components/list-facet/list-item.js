"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _checked = require("../icons/checked");

var _checked2 = _interopRequireDefault(_checked);

var _unchecked = require("../icons/unchecked");

var _unchecked2 = _interopRequireDefault(_unchecked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListFacetListItem = function (_React$Component) {
	_inherits(ListFacetListItem, _React$Component);

	function ListFacetListItem(props) {
		_classCallCheck(this, ListFacetListItem);

		var _this = _possibleConstructorReturn(this, (ListFacetListItem.__proto__ || Object.getPrototypeOf(ListFacetListItem)).call(this, props));

		_this.state = {
			checked: _this.props.checked
		};
		return _this;
	}

	_createClass(ListFacetListItem, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				checked: nextProps.checked
			});
		}
	}, {
		key: "handleClick",
		value: function handleClick() {
			this.props.onSelectFacetValue(this.props.facetName, this.props.name, this.props.checked);

			this.setState({
				checked: !this.state.checked
			});
		}
	}, {
		key: "getLabel",
		value: function getLabel() {
			return this.props.labels && this.props.labels[this.props.name] ? this.props.labels[this.props.name] : this.props.name;
		}
	}, {
		key: "render",
		value: function render() {
			var icon = this.state.checked ? _react2.default.createElement(_checked2.default, null) : _react2.default.createElement(_unchecked2.default, null);

			return _react2.default.createElement(
				"li",
				{
					className: "hire-list-facet-list-item",
					onClick: this.handleClick.bind(this) },
				icon,
				_react2.default.createElement(
					"label",
					{ title: this.props.name },
					this.getLabel()
				),
				_react2.default.createElement(
					"span",
					{ className: "count" },
					this.props.count
				)
			);
		}
	}]);

	return ListFacetListItem;
}(_react2.default.Component);

ListFacetListItem.defaultProps = {
	count: 0,
	checked: false,
	facetName: "",
	name: ""
};

ListFacetListItem.propTypes = {
	checked: _react2.default.PropTypes.bool,
	count: _react2.default.PropTypes.number,
	facetName: _react2.default.PropTypes.string,
	labels: _react2.default.PropTypes.object,
	name: _react2.default.PropTypes.string,
	onSelectFacetValue: _react2.default.PropTypes.func
};

exports.default = ListFacetListItem;