import React from "react";

import TextSearch from "./text-search";
import ListFacet from "./list-facet";

class Facets extends React.Component {
	render() {
		let facetList = (this.props.facetList.length) ?
			this.props.facetList.map((facetName) => {
				let found = this.props.results.last.facets.filter((facet) =>
					facet.title === facetName
				);

				if (found.length) {
					return found[0];
				} else {
					throw new Error(`Unknown facet name: ${facetName}`);
				}
			}) :
			this.props.results.last.facets;

		let facets = facetList.map((data, index) => {
			return (
				<ListFacet
					data={data}
					key={index}
					labels={this.props.labels}
					onSelectFacetValue={this.props.onSelectFacetValue}
					queries={this.props.queries} />);
			});

		return (
			<ul className="hire-faceted-search-facets">
				<button onClick={this.props.onReset}>New search</button>
				<TextSearch
					onChangeSearchTerm={this.props.onChangeSearchTerm}
					value={this.props.queries.last.term} />
				{facets}
			</ul>
		);
	}
}

Facets.defaultProps = {

};

Facets.propTypes = {
	facetList: React.PropTypes.array,
	labels: React.PropTypes.object,
	onChangeSearchTerm: React.PropTypes.func,
	onReset: React.PropTypes.func,
	onSelectFacetValue: React.PropTypes.func,
	queries: React.PropTypes.object,
	results: React.PropTypes.object
};

export default Facets;