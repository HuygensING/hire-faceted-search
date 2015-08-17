import React from "react";

import Result from "./result";
import ResultsSortMenu from "./sort-menu";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class Results extends React.Component {
	render() {
		let results = this.props.facetData.get("results")
			.map((data, index) =>
				<Result
					data={data}
					key={index}
					onSelect={this.props.onSelect} />
			);

		return (
			<div className="hire-faceted-search-results">
				<header>
					<h3>Found {this.props.facetData.get("numFound")} results</h3>
					<ResultsSortMenu values={this.props.sortParameters} />
				</header>
				<ul>
					{results}
				</ul>
			</div>
		);
	}
}

export default Results;