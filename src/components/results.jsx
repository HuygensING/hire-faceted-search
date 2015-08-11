import React from "react";

import ListFacet from "./list-facet";

class Results extends React.Component {
	render() {
		console.log(this.props.facetData.toJS());
		let results = this.props.facetData.get("results")
			.map((data, index) =>
				<li key={index} onClick={this.props.onSelect.bind(this, data)}>
					<label>{data.get("name")}</label>
					<ul className="metadata">
						<li>
							<label>Date</label>
							<span>{data.get("metadata").get("Date")}</span>
						</li>
						<li>
							<label>Recipient</label>
							<span>{data.get("metadata").get("Recipient")}</span>
						</li>
						<li>
							<label>Sender</label>
							<span>{data.get("metadata").get("Sender")}</span>
						</li>
					</ul>
				</li>);

		return (
			<div className="hire-faceted-search-results">
				<h3>Found {this.props.facetData.get("numFound")} results</h3>
				<ul>
					{results}
				</ul>
			</div>
		);
	}
}

Results.defaultProps = {

};

Results.propTypes = {

};

export default Results;