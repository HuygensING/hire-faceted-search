import React from "react";
import {Map} from "immutable";

import resultsActions from "../../../actions/results";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class Pagination extends React.Component {
	handleClick(url) {
		url = url.replace("draft//api", "draft/api");
		resultsActions.getResultsFromUrl(url);
	}

	render() {
		let prev = (this.props.facetData.has("_prev")) ?
			<li
				className="prev"
				onClick={this.handleClick.bind(this, this.props.facetData.get("_prev"))}>Prev</li> :
			<li>&nbsp;</li>;

		let next = (this.props.facetData.has("_next")) ?
			<li
				className="next"
				onClick={this.handleClick.bind(this, this.props.facetData.get("_next"))}>Next</li> :
			null;

		return (
			<ul className="hire-faceted-search-pagination">
				{prev}
				{next}
			</ul>
		);
	}
}

Pagination.propTypes = {
	facetData: React.PropTypes.instanceOf(Map)
}

export default Pagination;