"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _sortCountAscending = require("../icons/sort-count-ascending");

var _sortCountAscending2 = _interopRequireDefault(_sortCountAscending);

var _sortCountDescending = require("../icons/sort-count-descending");

var _sortCountDescending2 = _interopRequireDefault(_sortCountDescending);

var _sortAlphabeticallyAscending = require("../icons/sort-alphabetically-ascending");

var _sortAlphabeticallyAscending2 = _interopRequireDefault(_sortAlphabeticallyAscending);

var _sortAlphabeticallyDescending = require("../icons/sort-alphabetically-descending");

var _sortAlphabeticallyDescending2 = _interopRequireDefault(_sortAlphabeticallyDescending);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* TODO Remove sort menu and move sort options (count/alpha) to facet schema.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	A schema is needed, because different facets, should be able to have different
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               	options set. */

var SortMenu = function (_React$Component) {
	_inherits(SortMenu, _React$Component);

	function SortMenu(props) {
		_classCallCheck(this, SortMenu);

		var _this = _possibleConstructorReturn(this, (SortMenu.__proto__ || Object.getPrototypeOf(SortMenu)).call(this, props));

		_this.state = {
			alphabet: props.type === "alphabet" ? props.direction : "ascending",
			count: props.type === "count" ? props.direction : "descending",
			current: props.type
		};
		return _this;
	}

	/*
  * Change the sort based on type (alphabet|count) clicked and current state.
  *
  * If the active sort type is clicked, the direction (ascending|descending) is changed.
  * If the inactive sort type is clicked, the type (alphabet|count) is set to current, the dir (ascending|descending) does not change.
  *
  * @param {String} type Type of sorting: "alphabet" or "count"
  */


	_createClass(SortMenu, [{
		key: "changeSort",
		value: function changeSort(type) {
			var direction = this.state.current !== type ? this.state[type] : this.state[type] === "ascending" ? "descending" : "ascending";

			this.setState(_defineProperty({
				current: type
			}, type, direction));

			this.props.onChange(type, direction);
		}
	}, {
		key: "render",
		value: function render() {
			var alphabetIcon = this.state.alphabet === "ascending" ? _react2.default.createElement(_sortAlphabeticallyAscending2.default, null) : _react2.default.createElement(_sortAlphabeticallyDescending2.default, null);

			var countIcon = this.state.count === "ascending" ? _react2.default.createElement(_sortCountAscending2.default, null) : _react2.default.createElement(_sortCountDescending2.default, null);

			return _react2.default.createElement(
				"ul",
				{ className: "hire-faceted-search-sort-menu" },
				_react2.default.createElement(
					"li",
					{
						className: (0, _classnames2.default)({
							active: this.state.current === "alphabet"
						}),
						onClick: this.changeSort.bind(this, "alphabet") },
					alphabetIcon
				),
				_react2.default.createElement(
					"li",
					{
						className: (0, _classnames2.default)({
							active: this.state.current === "count"
						}),
						onClick: this.changeSort.bind(this, "count") },
					countIcon
				)
			);
		}
	}]);

	return SortMenu;
}(_react2.default.Component);

SortMenu.propTypes = {
	direction: _react2.default.PropTypes.oneOf(["ascending", "descending"]),
	onChange: _react2.default.PropTypes.func.isRequired,
	type: _react2.default.PropTypes.oneOf(["alphabet", "count"])
};

exports.default = SortMenu;