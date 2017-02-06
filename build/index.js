"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.facetMap = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require("lodash.isequal");

var _lodash2 = _interopRequireDefault(_lodash);

var _filters = require("./components/filters");

var _filters2 = _interopRequireDefault(_filters);

var _results = require("./components/results");

var _results2 = _interopRequireDefault(_results);

var _loaderThreeDots = require("./components/icons/loader-three-dots");

var _loaderThreeDots2 = _interopRequireDefault(_loaderThreeDots);

var _results3 = require("./actions/results");

var _queries = require("./actions/queries");

var _redux = require("redux");

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _facetMap = require("./components/facet-map");

var _facetMap2 = _interopRequireDefault(_facetMap);

var _defaults = require("./defaults");

var _results4 = require("./reducers/results");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//const logger = store => next => action => {
//	if (action.hasOwnProperty("type")) {
//		console.log("[FACETED SEARCH] " + action.type, action);
//	}
//
//   return next(action);
//};

var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);

var FacetedSearch = function (_React$Component) {
	_inherits(FacetedSearch, _React$Component);

	function FacetedSearch(props) {
		_classCallCheck(this, FacetedSearch);

		var _this = _possibleConstructorReturn(this, (FacetedSearch.__proto__ || Object.getPrototypeOf(FacetedSearch)).call(this, props));

		var initialState = {
			config: _extends({}, _defaults.configDefaults, _this.props.config),
			labels: _extends({}, _defaults.labelsDefaults, _this.props.labels)
		};

		if (_this.props.result != null) {
			initialState.results = (0, _results4.createFirstResultsState)(_this.props.result);
		}

		_this.store = createStoreWithMiddleware(_reducers2.default, initialState);

		if (_this.props.query != null) {
			_this.store.dispatch({
				type: "SET_INITIAL_QUERY",
				initialQuery: _this.props.query
			});
		}

		_this.state = _this.store.getState();
		return _this;
	}

	_createClass(FacetedSearch, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			this.unsubscribe = this.store.subscribe(function () {
				return _this2.setState(_this2.store.getState());
			});

			if (this.props.result == null) {
				this.store.dispatch((0, _results3.fetchResults)());
			}
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			// Update the labels. Use case: when the user changes
			// the language.
			if (!(0, _lodash2.default)(this.state.labels, nextProps.labels)) {
				this.store.dispatch({
					type: "SET_LABELS",
					labels: nextProps.labels
				});
			}

			// Set the next query. Use case: on forced rerender or
			// when passing query from one search to another.
			if (nextProps.query != null) {
				this.setQuery(nextProps.query);
			}
		}
	}, {
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.state.results.last !== nextState.results.last || nextState.results.requesting;
		}
	}, {
		key: "componentWillUpdate",
		value: function componentWillUpdate(nextProps, nextState) {
			if (!nextState.results.requesting) {
				if (this.props.onChange && nextState.results.all.length > 0) {
					this.props.onChange(nextState.results.last, nextState.queries.last);
				}

				if (this.props.onSearchId) {
					this.props.onSearchId(nextState.results.searchId);
				}
			}
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.unsubscribe();
		}
	}, {
		key: "setQuery",
		value: function setQuery(nextQuery) {
			// TODO: should set entire query!
			if (nextQuery.facetValues && !(0, _lodash2.default)(nextQuery.facetValues, this.state.queries.last.facetValues)) {
				this.store.dispatch((0, _queries.setFacetValues)(nextQuery.facetValues));
			}

			if (nextQuery.fullTextSearchParameters && !(0, _lodash2.default)(nextQuery.fullTextSearchParameters, this.state.queries.last.fullTextSearchParameters)) {
				if (nextQuery.fullTextSearchParameters.length) {
					this.store.dispatch((0, _queries.setFullTextSearchFields)(nextQuery.fullTextSearchParameters));
				} else if (this.state.queries.last.fullTextSearchParameters) {
					this.store.dispatch((0, _queries.removeFullTextSearchFields)());
				}
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			var loader = void 0,
			    filters = void 0,
			    results = void 0;

			if (this.state.results.all.length === 0) {
				loader = _react2.default.createElement(_loaderThreeDots2.default, { className: "loader" });
			} else {
				var FiltersComponent = this.props.customComponents.filters != null ? this.props.customComponents.filters : _filters2.default;

				filters = _react2.default.createElement(FiltersComponent, _extends({}, this.props, this.state, {
					onChangeFullTextField: function onChangeFullTextField(field, value) {
						return _this3.store.dispatch((0, _queries.changeFullTextSearchField)(field, value));
					},
					onChangeSearchTerm: function onChangeSearchTerm(value) {
						return _this3.store.dispatch((0, _queries.changeSearchTerm)(value));
					},
					onNewSearch: function onNewSearch() {
						return _this3.store.dispatch((0, _queries.newSearch)());
					},
					onSelectFacetRange: function onSelectFacetRange() {
						return _this3.store.dispatch(_queries.selectFacetRange.apply(undefined, arguments));
					},
					onSelectFacetValue: function onSelectFacetValue() {
						return _this3.store.dispatch(_queries.selectFacetValue.apply(undefined, arguments));
					} }));

				results = _react2.default.createElement(_results2.default, _extends({}, this.props, this.state, {
					onChangeFullTextField: function onChangeFullTextField(field, value) {
						return _this3.store.dispatch((0, _queries.changeFullTextSearchField)(field, value));
					},
					onChangeSearchTerm: function onChangeSearchTerm(value) {
						return _this3.store.dispatch((0, _queries.changeSearchTerm)(value));
					},
					onFetchNextResults: function onFetchNextResults(url) {
						return _this3.store.dispatch((0, _results3.fetchNextResults)(url));
					},
					onSelect: this.props.onSelect,
					onSelectFacetValue: function onSelectFacetValue() {
						return _this3.store.dispatch(_queries.selectFacetValue.apply(undefined, arguments));
					},
					onSetSort: function onSetSort(field) {
						return _this3.store.dispatch((0, _queries.setSort)(field));
					} }));
			}

			return _react2.default.createElement(
				"div",
				{ className: (0, _classnames2.default)("hire-faceted-search", this.props.className) },
				loader,
				filters,
				results
			);
		}
	}]);

	return FacetedSearch;
}(_react2.default.Component);

FacetedSearch.defaultProps = {
	className: "",
	customComponents: {
		currentQuery: null,
		filters: null,
		result: null
	},
	facetList: [],
	labels: {},
	metadataList: []
};

FacetedSearch.propTypes = {
	className: _react2.default.PropTypes.string,
	config: _react2.default.PropTypes.object.isRequired,
	customComponents: _react2.default.PropTypes.object,
	facetList: _react2.default.PropTypes.array,
	facetSortMap: _react2.default.PropTypes.object,
	labels: _react2.default.PropTypes.object,
	metadataList: _react2.default.PropTypes.array,
	numberedResults: _react2.default.PropTypes.bool,
	onChange: _react2.default.PropTypes.func,
	onSearchId: _react2.default.PropTypes.func,
	onSelect: _react2.default.PropTypes.func,
	query: _react2.default.PropTypes.object,
	result: _react2.default.PropTypes.object
};

exports.facetMap = _facetMap2.default;
exports.default = FacetedSearch;