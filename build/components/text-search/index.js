"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _search = require("../icons/search");

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // TODO add searching class to .search-icon when async query is busy

var TextSearch = function (_React$Component) {
	_inherits(TextSearch, _React$Component);

	function TextSearch(props) {
		_classCallCheck(this, TextSearch);

		var _this = _possibleConstructorReturn(this, (TextSearch.__proto__ || Object.getPrototypeOf(TextSearch)).call(this, props));

		_this.state = {
			value: "",
			searching: false
		};
		return _this;
	}

	_createClass(TextSearch, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.setState({
				searching: false,
				value: nextProps.value
			});
		}
	}, {
		key: "handleInputChange",
		value: function handleInputChange(ev) {
			this.setState({
				value: ev.target.value
			});
		}
	}, {
		key: "handleInputKeyDown",
		value: function handleInputKeyDown(ev) {
			if (ev.keyCode === 13) {
				this.handleSubmit();
			}
		}
	}, {
		key: "handleSubmit",
		value: function handleSubmit() {
			this.setState({
				searching: true
			});

			this.props.onChangeSearchTerm(this.state.value);
		}
	}, {
		key: "render",
		value: function render() {
			var title = this.props.labels && this.props.labels.facetTitles.hasOwnProperty(this.props.field) ? this.props.labels.facetTitles[this.props.field] : this.props.field;

			return _react2.default.createElement(
				"li",
				{ className: "hire-faceted-search-text-search" },
				_react2.default.createElement(
					"header",
					null,
					_react2.default.createElement(
						"h3",
						null,
						title
					)
				),
				_react2.default.createElement("input", {
					onChange: this.handleInputChange.bind(this),
					onKeyDown: this.handleInputKeyDown.bind(this),
					value: this.state.value }),
				_react2.default.createElement(
					"div",
					{ className: (0, _classnames2.default)("search-icon", {
							active: this.state.value !== "",
							searching: this.state.searching
						}),
						onClick: this.handleSubmit.bind(this) },
					_react2.default.createElement(
						"div",
						{ className: "center-vertical" },
						_react2.default.createElement(_search2.default, null)
					)
				)
			);
		}
	}]);

	return TextSearch;
}(_react2.default.Component);

TextSearch.defaultProps = {
	field: "term"
};

TextSearch.propTypes = {
	field: _react2.default.PropTypes.string,
	labels: _react2.default.PropTypes.object,
	onChangeSearchTerm: _react2.default.PropTypes.func
};

exports.default = TextSearch;