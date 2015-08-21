import React from "react";
// import {Map} from "immutable";

import queriesActions from "../../../actions/queries";
import FacetValue from "./facet-value";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class CurrentQuery extends React.Component {
	toLabel(name) {
		return (this.props.labels.facetTitles.hasOwnProperty(name)) ?
			this.props.labels.facetTitles[name] :
			name;
	}

	handleSearchTermClick() {
		queriesActions.changeSearchTerm("");
	}

	render() {
		let query = this.props.queries.last;

		let searchTerm = (query.term !== "") ?
			<li className="search-term">
				<label>Search term</label>
				<span onClick={this.handleSearchTermClick.bind(this)}>{query.term}</span>
			</li> :
			null;

		let facets = query.facetValues
			.map((selectedFacet, index) => {
				let facetTitle;
				let filteredFacets = (this.props.results.last.facets.filter((facet) =>
					facet.name === selectedFacet.name
				));

				if (filteredFacets.length) {
					facetTitle = filteredFacets[0].title;
				} else {
					return new Error("CurrentQuery: facet not found!");
				}

				let facetValues = selectedFacet.values
					.map((value, index2) =>
						<FacetValue
							facetName={selectedFacet.name}
							key={index2}
							value={value} />);

				return (
					<li key={index}>
						<label>{this.toLabel(facetTitle)}</label>
						<ul>
							{facetValues}
						</ul>
					</li>);
		});


		return (
			<ul className="hire-faceted-search-current-query">
				{searchTerm}
				{facets}
			</ul>
		);
	}
}

CurrentQuery.propTypes = {
	labels: React.PropTypes.object,
	queries: React.PropTypes.object,
	results: React.PropTypes.object
};

export default CurrentQuery;