"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsSortMenu = function (_React$Component) {
	_inherits(ResultsSortMenu, _React$Component);

	function ResultsSortMenu(props) {
		_classCallCheck(this, ResultsSortMenu);

		var _this = _possibleConstructorReturn(this, (ResultsSortMenu.__proto__ || Object.getPrototypeOf(ResultsSortMenu)).call(this, props));

		_this.state = {
			optionsVisible: false,
			level: props.values.length ? props.values[0] : null
		};
		return _this;
	}

	_createClass(ResultsSortMenu, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				optionsVisible: false,
				level: nextProps.values.length ? nextProps.values[0] : null
			});
		}
	}, {
		key: "handleButtonClick",
		value: function handleButtonClick() {
			this.setState({
				optionsVisible: !this.state.optionsVisible
			});
		}
	}, {
		key: "handleOptionClick",
		value: function handleOptionClick(level) {
			// queriesActions.setSortParameter(level.fieldname);
			this.props.onSetSort(level.fieldname);

			this.setState({
				optionsVisible: false,
				level: level
			});
		}
	}, {
		key: "toLabel",
		value: function toLabel(name) {
			return this.props.labels.hasOwnProperty(name) ? this.props.labels[name] : name;
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			if (!this.props.values.length) {
				return null;
			}

			var values = this.props.values.map(function (level, index) {
				return _react2.default.createElement(
					"li",
					{
						key: index,
						onClick: _this2.handleOptionClick.bind(_this2, level) },
					_this2.toLabel(level.fieldname)
				);
			});
			return _react2.default.createElement(
				"div",
				{ className: "hire-faceted-search-results-sort-menu" },
				_react2.default.createElement(
					"button",
					{
						onClick: this.handleButtonClick.bind(this) },
					this.props.labels.sortBy,
					": ",
					this.toLabel(this.state.level.fieldname)
				),
				_react2.default.createElement(
					"ul",
					{
						className: (0, _classnames2.default)({ visible: this.state.optionsVisible }) },
					values
				)
			);
		}
	}]);

	return ResultsSortMenu;
}(_react2.default.Component);

ResultsSortMenu.defaultProps = {};

ResultsSortMenu.propTypes = {
	labels: _react2.default.PropTypes.object,
	onSetSort: _react2.default.PropTypes.func,
	values: _react2.default.PropTypes.array
};

exports.default = ResultsSortMenu;