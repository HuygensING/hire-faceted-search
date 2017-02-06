"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _sortMenu = require("../sort-menu");

var _sortMenu2 = _interopRequireDefault(_sortMenu);

var _filterMenu = require("../filter-menu");

var _filterMenu2 = _interopRequireDefault(_filterMenu);

var _listItem = require("./list-item");

var _listItem2 = _interopRequireDefault(_listItem);

var _sortFunction = require("./sort-function");

var _sortFunction2 = _interopRequireDefault(_sortFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INIT_SIZE = 12;

var ListFacet = function (_React$Component) {
	_inherits(ListFacet, _React$Component);

	function ListFacet(props) {
		_classCallCheck(this, ListFacet);

		var _this = _possibleConstructorReturn(this, (ListFacet.__proto__ || Object.getPrototypeOf(ListFacet)).call(this, props));

		_this.state = {
			filterQuery: "",
			showAll: false,
			sortDirection: props.sort != null ? props.sort.direction : "descending",
			sortType: props.sort != null ? props.sort.type : "count"
		};
		return _this;
	}

	_createClass(ListFacet, [{
		key: "handleButtonClick",
		value: function handleButtonClick() {
			this.setState({
				showAll: true
			});
		}
	}, {
		key: "handleSortMenuChange",
		value: function handleSortMenuChange(type, direction) {
			this.setState({
				sortDirection: direction,
				sortType: type
			});
		}
	}, {
		key: "handleFilterMenuChange",
		value: function handleFilterMenuChange(filterQuery) {
			this.setState({
				filterQuery: filterQuery
			});
		}
	}, {
		key: "selectedValues",
		value: function selectedValues() {
			var _this2 = this;

			var selectedValues = this.props.queries.last.facetValues.filter(function (values) {
				return values.name === _this2.props.data.name;
			});

			return selectedValues.length ? selectedValues[0].values : selectedValues;
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var filterMenu = void 0,
			    sortMenu = void 0;

			var options = this.props.data.options;
			options = options.sort((0, _sortFunction2.default)(this.state.sortType, this.state.sortDirection));

			if (this.props.showSortMenu) {
				sortMenu = _react2.default.createElement(_sortMenu2.default, {
					direction: this.state.sortDirection,
					onChange: this.handleSortMenuChange.bind(this),
					type: this.state.sortType });
			}

			if (this.props.showFilterMenu) {
				filterMenu = _react2.default.createElement(_filterMenu2.default, { onChange: this.handleFilterMenuChange.bind(this) });

				if (this.state.filterQuery.length) {
					(function () {
						var query = _this3.state.filterQuery.toLowerCase();

						options = options.filter(function (option) {
							return option.name.toLowerCase().indexOf(query) > -1;
						});
					})();
				}
			}

			var optionsToRender = this.state.showAll ? options : options.slice(0, INIT_SIZE - 1);

			var selectedValues = this.selectedValues();

			var valueLabels = this.props.labels.facetValues && this.props.labels.facetValues[this.props.data.name] ? this.props.labels.facetValues[this.props.data.name] : null;

			var listItems = optionsToRender.map(function (option, index) {
				return _react2.default.createElement(_listItem2.default, {
					checked: selectedValues.indexOf(option.name) > -1,
					count: option.count,
					facetName: _this3.props.data.name,
					key: index,
					labels: valueLabels,
					name: option.name,
					onSelectFacetValue: _this3.props.onSelectFacetValue });
			});

			if (!listItems.length) {
				listItems = _react2.default.createElement(
					"li",
					{ className: "no-options-found" },
					"No options found."
				);
			}

			var title = this.props.data.name;
			var facetTitle = this.props.labels.facetTitles.hasOwnProperty(title) ? this.props.labels.facetTitles[title] : title;

			var moreButton = !this.state.showAll && options.length > INIT_SIZE ? _react2.default.createElement(
				"button",
				{ onClick: this.handleButtonClick.bind(this) },
				this.props.labels.showAll,
				" (",
				options.length,
				")"
			) : null;

			return _react2.default.createElement(
				"li",
				{
					className: (0, _classnames2.default)("hire-facet", "hire-list-facet", { "show-all": this.state.showAll }) },
				_react2.default.createElement(
					"header",
					null,
					_react2.default.createElement(
						"h3",
						null,
						facetTitle
					),
					filterMenu,
					sortMenu
				),
				_react2.default.createElement(
					"ul",
					null,
					listItems
				),
				moreButton
			);
		}
	}]);

	return ListFacet;
}(_react2.default.Component);

ListFacet.defaultProps = {
	showFilterMenu: true,
	showSortMenu: false
};

ListFacet.propTypes = {
	data: _react2.default.PropTypes.object,
	labels: _react2.default.PropTypes.object,
	onSelectFacetValue: _react2.default.PropTypes.func,
	queries: _react2.default.PropTypes.object,
	showFilterMenu: _react2.default.PropTypes.bool,
	showSortMenu: _react2.default.PropTypes.bool,
	sort: _react2.default.PropTypes.shape({
		direction: _react2.default.PropTypes.oneOf(["ascending", "descending"]),
		type: _react2.default.PropTypes.oneOf(["alphabet", "count"])
	})
};

exports.default = ListFacet;