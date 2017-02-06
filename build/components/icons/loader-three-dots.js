"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getNextState = function getNextState(prevState, progress) {
	var state = Object.keys(prevState).reduce(function (obj, currentProp) {
		var delta = prevState[currentProp].max - prevState[currentProp].min;
		var amplitude = delta / 2;

		var verticalTranslation = prevState[currentProp].min + amplitude;
		var horizontalTranslation = (prevState[currentProp].start - prevState[currentProp].min) / delta * Math.PI;

		var period = 2 * Math.PI / 1400 * progress;

		var current = amplitude * Math.sin(period - horizontalTranslation) + verticalTranslation;

		var nextState = { current: current };

		obj[currentProp] = _extends({}, prevState[currentProp], nextState);

		return obj;
	}, {});

	return state;
};

var LoaderThreeDots = function (_React$Component) {
	_inherits(LoaderThreeDots, _React$Component);

	function LoaderThreeDots(props) {
		_classCallCheck(this, LoaderThreeDots);

		var _this = _possibleConstructorReturn(this, (LoaderThreeDots.__proto__ || Object.getPrototypeOf(LoaderThreeDots)).call(this, props));

		_this.start = null;

		var radiusDefaults = {
			max: 15,
			min: 9,
			start: 9
		};

		var opacityDefaults = {
			max: 1,
			min: 0.4,
			start: 0.4
		};

		_this.state = {
			circle1: {
				opacity: opacityDefaults,
				radius: radiusDefaults
			},
			circle2: {
				opacity: _extends({}, opacityDefaults, {
					start: 0.6
				}),
				radius: _extends({}, radiusDefaults, {
					start: 11
				})
			},
			circle3: {
				opacity: _extends({}, opacityDefaults, {
					start: 0.8
				}),
				radius: _extends({}, radiusDefaults, {
					start: 13
				})
			}
		};

		_this.animationFrameListener = _this.step.bind(_this);
		return _this;
	}

	_createClass(LoaderThreeDots, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.mounted = true;
			window.requestAnimationFrame(this.animationFrameListener);
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			this.mounted = false;
			window.cancelAnimationFrame(this.animationFrameListener);
		}
	}, {
		key: "step",
		value: function step(timestamp) {
			if (!this.mounted) {
				window.cancelAnimationFrame(this.animationFrameListener);
				return;
			}

			if (this.start == null) {
				this.start = timestamp;
			}

			var progress = timestamp - this.start;
			if (_reactDom2.default.findDOMNode(this).getBoundingClientRect().width) {
				this.setState({
					circle1: getNextState(this.state.circle1, progress),
					circle2: getNextState(this.state.circle2, progress),
					circle3: getNextState(this.state.circle3, progress)
				});
			}
			window.requestAnimationFrame(this.animationFrameListener);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"svg",
				{
					className: this.props.className,
					fill: "#fff",
					height: "30",
					viewBox: "0 0 120 30",
					width: "120" },
				_react2.default.createElement("circle", {
					cx: "15",
					cy: "15",
					fillOpacity: this.state.circle1.opacity.current,
					r: this.state.circle1.radius.current }),
				_react2.default.createElement("circle", {
					cx: "60",
					cy: "15",
					fillOpacity: this.state.circle2.opacity.current,
					r: this.state.circle2.radius.current }),
				_react2.default.createElement("circle", {
					cx: "105",
					cy: "15",
					fillOpacity: this.state.circle3.opacity.current,
					r: this.state.circle3.radius.current })
			);
		}
	}]);

	return LoaderThreeDots;
}(_react2.default.Component);

LoaderThreeDots.propTypes = {
	className: _react2.default.PropTypes.string
};

exports.default = LoaderThreeDots;