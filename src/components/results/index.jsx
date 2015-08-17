import React from "react";

import Result from "./result";
import ResultsSortMenu from "./sort-menu";
import ResultsRows from "./rows";

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
					i18n={this.props.i18n}
					key={index}
					onSelect={this.props.onSelect} />
			);

		return (
			<div className="hire-faceted-search-results">
				<header>
					<h3>{this.props.i18n["Results found"]}: {this.props.facetData.get("numFound")}</h3>
					<ResultsSortMenu
						i18n={this.props.i18n}
						values={this.props.sortParameters} />
					<ResultsRows
						rows={this.props.rows} />
				</header>
				<ul>
					{results}
				</ul>
			</div>
		);
	}
}

Results.propTypes = {
	i18n: React.PropTypes.object,
	rows: React.PropTypes.number
}

export default Results;