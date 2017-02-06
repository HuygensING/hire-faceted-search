"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require("redux");

var _queries = require("./queries");

var _queries2 = _interopRequireDefault(_queries);

var _results = require("./results");

var _results2 = _interopRequireDefault(_results);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
	config: function config() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		return state;
	},
	labels: function labels() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		return state;
	},
	queries: _queries2.default,
	results: _results2.default
});