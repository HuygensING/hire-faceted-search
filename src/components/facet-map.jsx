import React from "react";
import ListFacet from "./list-facet";
import RangeFacet from "./range-facet";

export default {
	LIST(data, props, key) {
		let sort = (props.facetSortMap.hasOwnProperty(data.name)) ?
			props.facetSortMap[data.name] :
			null;

		return (<ListFacet
			data={data}
			key={key}
			labels={props.labels}
			onSelectFacetValue={props.onSelectFacetValue}
			queries={props.queries}
			sort={sort} />
		);
	},

	BOOLEAN(...args) {
		return this.LIST(...args);
	},

	RANGE(data, props, key) {
		return (<RangeFacet
			data={data}
			key={key}
			labels={props.labels}
			onSelectFacetRange={props.onSelectFacetRange}
			queries={props.queries} />
		);
	}
};