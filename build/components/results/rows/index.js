"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _insertCss = require("insert-css");

var _insertCss2 = _interopRequireDefault(_insertCss);

var _config = require("../../../actions/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fs = require("fs");
var css = fs.readFileSync(__dirname + "/index.css");
if (typeof window != 'undefined' && window.document) {
	(0, _insertCss2.default)(css, { prepend: true });
}

var ResultsRows = function (_React$Component) {
	_inherits(ResultsRows, _React$Component);

	function ResultsRows(props) {
		_classCallCheck(this, ResultsRows);

		var _this = _possibleConstructorReturn(this, (ResultsRows.__proto__ || Object.getPrototypeOf(ResultsRows)).call(this, props));

		_this.state = {
			value: _this.props.rows
		};
		return _this;
	}

	_createClass(ResultsRows, [{
		key: "handleSelectChange",
		value: function handleSelectChange(ev) {
			this.setState({
				value: ev.target.value
			});

			_config2.default.set("rows", parseInt(ev.target.value, 10));
		}
	}, {
		key: "render",
		value: function render() {
			var options = [10, 20, 50, 100, 1000].map(function (option, index) {
				return _react2.default.createElement(
					"option",
					{
						key: index,
						value: option },
					option
				);
			});

			return _react2.default.createElement(
				"select",
				{
					className: "hire-faceted-search-results-rows",
					onChange: this.handleSelectChange.bind(this),
					value: this.state.value },
				options
			);
		}
	}]);

	return ResultsRows;
}(_react2.default.Component);

ResultsRows.propTypes = {
	rows: _react2.default.PropTypes.number
};

exports.default = ResultsRows;