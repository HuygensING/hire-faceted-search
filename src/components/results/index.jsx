import React from "react";

import Result from "./result";
import ResultsSortMenu from "./sort-menu";

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
					<ResultsSortMenu sortLevels={this.props.sortLevels} />
				</header>
				<ul>
					{results}
				</ul>
			</div>
		);
	}
}

Results.defaultProps = {
	sortLevels: []
};

Results.propTypes = {
	sortLevels: React.PropTypes.array
};

export default Results;