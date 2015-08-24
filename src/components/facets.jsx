import React from "react";

import TextSearch from "./text-search";
import ListFacet from "./list-facet";

class Facets extends React.Component {
	render() {
		let facets = this.props.results.last.facets.map((data, index) => {
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
	labels: React.PropTypes.object,
	onChangeSearchTerm: React.PropTypes.func,
	onReset: React.PropTypes.func,
	onSelectFacetValue: React.PropTypes.func,
	queries: React.PropTypes.object,
	results: React.PropTypes.object
};

export default Facets;