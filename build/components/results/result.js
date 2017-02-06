"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Result = function (_React$Component) {
	_inherits(Result, _React$Component);

	function Result() {
		_classCallCheck(this, Result);

		return _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).apply(this, arguments));
	}

	_createClass(Result, [{
		key: "toLabel",
		value: function toLabel(name) {
			return this.props.labels.hasOwnProperty(name) ? this.props.labels[name] : name;
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var model = this.props.data;
			var metadataList = this.props.metadataList;
			if (metadataList.length === 0) {
				metadataList = Object.keys(this.props.data.data);
			}
			var metadata = Object.keys(this.props.data.data).filter(function (key) {
				return _this2.props.data.data[key] !== "" && metadataList.indexOf(key) > -1;
			}).sort(function (a, b) {
				return metadataList.indexOf(a) > metadataList.indexOf(b);
			}).map(function (key, index) {
				return _react2.default.createElement(
					"li",
					{ key: index },
					_react2.default.createElement(
						"label",
						null,
						_this2.toLabel(key)
					),
					_react2.default.createElement(
						"span",
						null,
						_this2.props.data.data[key]
					)
				);
			});

			metadata = metadata.length ? _react2.default.createElement(
				"ul",
				{ className: "metadata" },
				metadata
			) : null;

			return _react2.default.createElement(
				"li",
				{ onClick: this.props.onSelect.bind(this, model) },
				_react2.default.createElement(
					"label",
					null,
					this.props.data.displayName
				),
				metadata
			);
		}
	}]);

	return Result;
}(_react2.default.Component);

Result.defaultProps = {};

Result.propTypes = {
	data: _react2.default.PropTypes.object,
	labels: _react2.default.PropTypes.object,
	metadataList: _react2.default.PropTypes.array,
	onSelect: _react2.default.PropTypes.func
};

exports.default = Result;