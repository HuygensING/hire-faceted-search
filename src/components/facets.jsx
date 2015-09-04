import React from "react";

import TextSearch from "./text-search";
import ListFacet from "./list-facet";
import RangeFacet from "./range-facet";

class Facets extends React.Component {
	render() {
		let facetList = (this.props.facetList.length) ?
			this.props.facetList.map((facetName) => {
				let found = this.props.results.last.facets.filter((facet) =>
					facet.name === facetName
				);
				if (found.length) {
					return found[0];
				} else {
					return null;
				}
			}).filter((facetName) => facetName !== null) :
			this.props.results.last.facets;

		let facets = facetList.map((data, index) => {
			if(data.type === "LIST") {
				return (
					<ListFacet
						data={data}
						key={index}
						labels={this.props.labels}
						onSelectFacetValue={this.props.onSelectFacetValue}
						queries={this.props.queries} />);
			} else {
				return (<RangeFacet
					data={data}
					key={index}
					labels={this.props.labels}
					onSelectFacetRange={this.props.onSelectFacetRange}
					queries={this.props.queries}
					/>);
			}
		});

		return (
			<ul className="hire-faceted-search-facets">
				<button onClick={this.props.onNewSearch}>New search</button>
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
	onNewSearch: React.PropTypes.func,
	onSelectFacetRange: React.PropTypes.func,
	onSelectFacetValue: React.PropTypes.func,
	queries: React.PropTypes.object,
	results: React.PropTypes.object
};

export default Facets;