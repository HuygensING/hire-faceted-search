import React from "react";

import TextSearch from "./text-search";
import ListFacet from "./list-facet";
import RangeFacet from "./range-facet";

let facetMap = {
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

class Facets extends React.Component {
	render() {
		let updateCount = (facetName) => {
			let found = this.props.results.last.facets.filter((facet) =>
				facet.name === facetName
			);

			return (found.length) ? found[0] : null;
		};

		let notNull = (facetName) =>
			facetName !== null;

		let toComponent = (data, index) =>
			facetMap[data.type](data, this.props, index);

		let facets = (this.props.facetList.length) ?
			this.props.facetList
				.map(updateCount)
				.filter(notNull) :
			this.props.results.last.facets;

		return (
			<ul className="hire-faceted-search-facets">
				<button onClick={this.props.onNewSearch}>New search</button>
				<TextSearch
					onChangeSearchTerm={this.props.onChangeSearchTerm}
					value={this.props.queries.last.term} />
				{facets.map(toComponent)}
			</ul>
		);
	}
}

Facets.defaultProps = {
	facetSortMap: {}
};

Facets.propTypes = {
	facetList: React.PropTypes.array,
	labels: React.PropTypes.object,
	onChangeSearchTerm: React.PropTypes.func,
	onNewSearch: React.PropTypes.func,
	onSelectFacetRange: React.PropTypes.func,
	onSelectFacetValue: React.PropTypes.func,
	queries: React.PropTypes.object,
	results: React.PropTypes.object
};

export default Facets;