import React from "react";

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

	onChangeFullTextField(field, value) {
		this.props.onChangeFullTextField(field, value);
	}

	render() {
		let query = this.props.queries.last;

		let searchTerm = (query.term !== "") ?
			<li className="search-term">
				<label>{this.toLabel("term")}</label>
				<span onClick={this.props.onChangeSearchTerm.bind(this, "")}>{query.term}</span>
			</li> :
			null;

		let extraSearchTerms = query.fullTextSearchParameters && query.fullTextSearchParameters.length ?
			query.fullTextSearchParameters.map((fullTextSearchParameter, i) => (
				<li className="search-term" key={i}>
					<label>{this.toLabel(fullTextSearchParameter.name)}</label>
					<span onClick={this.onChangeFullTextField.bind(this, fullTextSearchParameter.name, "")}>{fullTextSearchParameter.term}</span>
				</li>
			)) :
			null;

		let facets = query.facetValues
			.map((selectedFacet, index) => {
				let facetTitle;
				let filteredFacets = (this.props.results.last.facets.filter((facet) =>
					facet.name === selectedFacet.name
				));

				if (filteredFacets.length) {
					facetTitle = filteredFacets[0].name;
				} else {
					return new Error("CurrentQuery: facet not found!");
				}

				let facetValues = selectedFacet.values ?
					selectedFacet.values.map((value, index2) =>
						<FacetValue
							facetName={selectedFacet.name}
							key={index2}
							onSelectFacetValue={this.props.onSelectFacetValue}
							value={value} />)
					: <FacetValue
							facetName={selectedFacet.name}
							onSelectFacetValue={this.props.onSelectFacetValue}
							range={{lowerLimit: selectedFacet.lowerLimit, upperLimit: selectedFacet.upperLimit}} />;
				return (
					<li
						className="hire-faceted-search-selected-facet"
						key={index}>
						<label>{this.toLabel(facetTitle)}</label>
						<ul>
							{facetValues}
						</ul>
					</li>);
		});


		return (
			<ul className="hire-faceted-search-current-query">
				{searchTerm}
				{extraSearchTerms}
				{facets}
			</ul>
		);
	}
}

CurrentQuery.propTypes = {
	labels: React.PropTypes.object,
	onChangeFullTextField: React.PropTypes.func,
	onChangeSearchTerm: React.PropTypes.func,
	onSelectFacetValue: React.PropTypes.func,
	queries: React.PropTypes.object,
	results: React.PropTypes.object
};

export default CurrentQuery;