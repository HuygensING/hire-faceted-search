import React from "react";
import {Map} from "immutable";

import queriesActions from "../../../actions/queries";
import FacetValue from "./facet-value";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class CurrentQuery extends React.Component {
	toI18n(name) {
		return (this.props.i18n.facetTitles.hasOwnProperty(name)) ?
			this.props.i18n.facetTitles[name] :
			name;
	}

	handleSearchTermClick() {
		queriesActions.changeSearchTerm("");
	}

	render() {
		let query = this.props.values;

		let searchTerm = (query.get("term") !== "") ?
			<li className="search-term">
				<label>Search term</label>
				<span onClick={this.handleSearchTermClick.bind(this)}>{query.get("term")}</span>
			</li> :
			null

		let facets = query.get("facetValues")
			.map((selectedFacet, index) => {
				let facetTitle = (this.props.facetData.get("facets").find((facet) =>
					facet.get("name") === selectedFacet.get("name")
				)).get("title");

				let facetValues = selectedFacet.get("values")
					.map((value, index2) =>
						<FacetValue
							facetName={selectedFacet.get("name")}
							key={index2}
							value={value} />)

				return (
					<li key={index}>
						<label>{this.toI18n(facetTitle)}</label>
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
	facetData: React.PropTypes.instanceOf(Map),
	i18n: React.PropTypes.object,
	values: React.PropTypes.instanceOf(Map)
}

export default CurrentQuery;