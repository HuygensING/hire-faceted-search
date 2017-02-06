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

var FilterIcon = function (_React$Component) {
	_inherits(FilterIcon, _React$Component);

	function FilterIcon() {
		_classCallCheck(this, FilterIcon);

		return _possibleConstructorReturn(this, (FilterIcon.__proto__ || Object.getPrototypeOf(FilterIcon)).apply(this, arguments));
	}

	_createClass(FilterIcon, [{
		key: "render",
		value: function render() {
			var title = this.props.title != null ? _react2.default.createElement(
				"title",
				null,
				this.props.title
			) : null;

			return _react2.default.createElement(
				"svg",
				{ className: "hire-icon filter", viewBox: "0 0 971.986 971.986" },
				title,
				_react2.default.createElement("path", { d: "M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3 c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873 c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z" })
			);
		}
	}]);

	return FilterIcon;
}(_react2.default.Component);

FilterIcon.defaultProps = {};

FilterIcon.propTypes = {
	title: _react2.default.PropTypes.string
};

exports.default = FilterIcon;