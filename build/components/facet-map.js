"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _listFacet = require("./list-facet");

var _listFacet2 = _interopRequireDefault(_listFacet);

var _rangeFacet = require("./range-facet");

var _rangeFacet2 = _interopRequireDefault(_rangeFacet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	LIST: function LIST(data, props, key) {
		var sort = props.facetSortMap.hasOwnProperty(data.name) ? props.facetSortMap[data.name] : null;

		return _react2.default.createElement(_listFacet2.default, {
			data: data,
			key: key,
			labels: props.labels,
			onSelectFacetValue: props.onSelectFacetValue,
			queries: props.queries,
			sort: sort });
	},
	BOOLEAN: function BOOLEAN() {
		return this.LIST.apply(this, arguments);
	},
	RANGE: function RANGE(data, props, key) {
		return _react2.default.createElement(_rangeFacet2.default, {
			data: data,
			key: key,
			labels: props.labels,
			onSelectFacetRange: props.onSelectFacetRange,
			queries: props.queries });
	}
};