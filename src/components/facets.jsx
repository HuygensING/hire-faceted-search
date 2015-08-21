import React from "react";
// import Immutable from "immutable";

import TextSearch from "./text-search";
import ListFacet from "./list-facet";

import queriesActions from "../actions/queries";

class Facets extends React.Component {
	handleButtonClick() {
		queriesActions.reset();
	}

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
				<button onClick={this.handleButtonClick.bind(this)}>New search</button>
				<TextSearch value={this.props.queries.last.term} />
				{facets}
			</ul>
		);
	}
}

Facets.defaultProps = {

};

Facets.propTypes = {
	labels: React.PropTypes.object,
	onSelectFacetValue: React.PropTypes.func,
	queries: React.PropTypes.object,
	results: React.PropTypes.object
};

export default Facets;