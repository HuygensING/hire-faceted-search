"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash.debounce");

var _lodash2 = _interopRequireDefault(_lodash);

var _result = require("./result");

var _result2 = _interopRequireDefault(_result);

var _sortMenu = require("./sort-menu");

var _sortMenu2 = _interopRequireDefault(_sortMenu);

var _hireCurrentQuery = require("hire-current-query");

var _hireCurrentQuery2 = _interopRequireDefault(_hireCurrentQuery);

var _loaderThreeDots = require("../icons/loader-three-dots");

var _loaderThreeDots2 = _interopRequireDefault(_loaderThreeDots);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var inViewport = function inViewport(el) {
	var rect = el.getBoundingClientRect();
	return rect.height > 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
};

var Results = function (_React$Component) {
	_inherits(Results, _React$Component);

	function Results(props) {
		_classCallCheck(this, Results);

		var _this = _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));

		_this.onScroll = (0, _lodash2.default)(_this.onScroll, 300).bind(_this);
		return _this;
	}

	_createClass(Results, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			window.addEventListener("scroll", this.onScroll);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			window.removeEventListener("scroll", this.onScroll);
		}
	}, {
		key: "onScroll",
		value: function onScroll() {
			var nth = this.props.results.last.refs.length - parseInt(Math.floor(this.props.config.rows / 2)) + 1;
			var listItem = _reactDom2.default.findDOMNode(this).querySelector(".hire-faceted-search-result-list > li:nth-child(" + nth + ")");
			if (this.props.results.last.hasOwnProperty("_next") && listItem && inViewport(listItem)) {
				var url = this.props.results.last._next;
				this.props.onFetchNextResults(url);
			}
		}
	}, {
		key: "dataToComponents",
		value: function dataToComponents(results) {
			var _this2 = this;

			var ResultComponent = this.props.customComponents.result != null ? this.props.customComponents.result : _result2.default;

			return results.map(function (data, index) {
				return _react2.default.createElement(ResultComponent, {
					data: data,
					key: index + Math.random(),
					labels: _this2.props.labels,
					metadataList: _this2.props.metadataList,
					onSelect: _this2.props.onSelect });
			});
		}
	}, {
		key: "render",
		value: function render() {
			var loader = this.props.results.requesting ? _react2.default.createElement(_loaderThreeDots2.default, { className: "loader" }) : null;

			var currentSortParameter = this.props.queries.last.sortParameters.length ? this.props.queries.last.sortParameters[0].fieldname : null;

			var sortValues = this.props.results.last.sortableFields.map(function (f) {
				return { fieldname: f };
			}).sort(function (a, b) {
				return a.fieldname === currentSortParameter ? -1 : b.fieldname === currentSortParameter ? 1 : 0;
			});

			var CurrentQueryComponent = this.props.customComponents.currentQuery != null ? this.props.customComponents.currentQuery : _hireCurrentQuery2.default;

			return _react2.default.createElement(
				"div",
				{ className: "hire-faceted-search-results" },
				_react2.default.createElement(
					"header",
					null,
					_react2.default.createElement(
						"h3",
						null,
						this.props.results.last.numFound,
						" ",
						this.props.labels.resultsFound
					),
					_react2.default.createElement(_sortMenu2.default, {
						labels: this.props.labels,
						onSetSort: this.props.onSetSort,
						values: sortValues }),
					_react2.default.createElement(CurrentQueryComponent, {
						labels: this.props.labels,
						onChangeFullTextField: this.props.onChangeFullTextField,
						onChangeSearchTerm: this.props.onChangeSearchTerm,
						onSelectFacetValue: this.props.onSelectFacetValue,
						queries: this.props.queries,
						results: this.props.results })
				),
				_react2.default.createElement(
					"ol",
					{ className: (0, _classnames2.default)("hire-faceted-search-result-list", { numbered: this.props.numberedResults }) },
					this.dataToComponents(this.props.results.last.refs) /* API V2.x uses refs as result key, back to results in API 3 */
				),
				loader
			);
		}
	}]);

	return Results;
}(_react2.default.Component);

Results.propTypes = {
	config: _react2.default.PropTypes.object,
	customComponents: _react2.default.PropTypes.object,
	labels: _react2.default.PropTypes.object,
	metadataList: _react2.default.PropTypes.array,
	numberedResults: _react2.default.PropTypes.bool,
	onChangeFullTextField: _react2.default.PropTypes.func,
	onChangeSearchTerm: _react2.default.PropTypes.func,
	onFetchNextResults: _react2.default.PropTypes.func,
	onSelect: _react2.default.PropTypes.func,
	onSelectFacetValue: _react2.default.PropTypes.func,
	onSetSort: _react2.default.PropTypes.func,
	queries: _react2.default.PropTypes.object,
	results: _react2.default.PropTypes.object

};

exports.default = Results;