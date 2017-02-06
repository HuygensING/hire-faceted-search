"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _textSearch = require("./text-search");

var _textSearch2 = _interopRequireDefault(_textSearch);

var _facetMap = require("./facet-map");

var _facetMap2 = _interopRequireDefault(_facetMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filters = function (_React$Component) {
	_inherits(Filters, _React$Component);

	function Filters() {
		_classCallCheck(this, Filters);

		return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).apply(this, arguments));
	}

	_createClass(Filters, [{
		key: "onChangeFullTextField",
		value: function onChangeFullTextField(field, value) {
			this.props.onChangeFullTextField(field, value);
		}
	}, {
		key: "renderFullTextSearch",
		value: function renderFullTextSearch(field, i) {
			var foundFields = (this.props.queries.last.fullTextSearchParameters || []).filter(function (fld) {
				return fld.name === field.name;
			});
			var value = foundFields.length ? foundFields[0].term : "";
			return _react2.default.createElement(_textSearch2.default, { field: field.name, key: i, labels: this.props.labels, onChangeSearchTerm: this.onChangeFullTextField.bind(this, field.name), value: value });
		}
	}, {
		key: "renderFullTextSearches",
		value: function renderFullTextSearches() {
			return {
				top: this.props.config.fullTextSearchFields.filter(function (field) {
					return field.position && field.position === "top" || !field.position;
				}).map(this.renderFullTextSearch.bind(this)),
				bottom: this.props.config.fullTextSearchFields.filter(function (field) {
					return field.position && field.position === "bottom";
				}).map(this.renderFullTextSearch.bind(this))
			};
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var updateCount = function updateCount(facetName) {
				var found = _this2.props.results.last.facets.filter(function (facet) {
					return facet.name === facetName;
				});

				return found.length ? found[0] : null;
			};

			var notNull = function notNull(facetName) {
				return facetName !== null;
			};

			var toComponent = function toComponent(data, index) {
				return _facetMap2.default[data.type](data, _this2.props, index);
			};

			var facets = this.props.facetList.length ? this.props.facetList.map(updateCount).filter(notNull) : this.props.results.last.facets;

			var freeTextSearch = this.props.config.hideFreeTextSearch ? null : _react2.default.createElement(_textSearch2.default, { labels: this.props.labels, onChangeSearchTerm: this.props.onChangeSearchTerm, value: this.props.queries.last.term });

			var fullTextSearches = this.props.config.fullTextSearchFields ? this.renderFullTextSearches() : { top: null, bottom: null };

			return _react2.default.createElement(
				"ul",
				{ className: "hire-faceted-search-filters" },
				_react2.default.createElement(
					"button",
					{ onClick: this.props.onNewSearch },
					"New search"
				),
				freeTextSearch,
				fullTextSearches.top,
				facets.map(toComponent),
				fullTextSearches.bottom
			);
		}
	}]);

	return Filters;
}(_react2.default.Component);

Filters.defaultProps = {
	config: { hideFreeTextSearch: false },
	facetSortMap: {}
};

Filters.propTypes = {
	config: _react2.default.PropTypes.object,
	facetList: _react2.default.PropTypes.array,
	labels: _react2.default.PropTypes.object,
	onChangeFullTextField: _react2.default.PropTypes.func,
	onChangeSearchTerm: _react2.default.PropTypes.func,
	onNewSearch: _react2.default.PropTypes.func,
	onSelectFacetRange: _react2.default.PropTypes.func,
	onSelectFacetValue: _react2.default.PropTypes.func,
	queries: _react2.default.PropTypes.object,
	results: _react2.default.PropTypes.object
};

exports.default = Filters;