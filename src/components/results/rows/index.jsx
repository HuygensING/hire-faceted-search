import React from "react";
import insertCss from "insert-css";

import configActions from "../../../actions/config";

let fs = require("fs");
let css = fs.readFileSync(__dirname + "/index.css");
if (typeof window != 'undefined' && window.document) {
	insertCss(css, {prepend: true});
}

class ResultsRows extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.rows
		};
	}

	handleSelectChange(ev) {
		this.setState({
			value: ev.target.value
		});

		configActions.set("rows", parseInt(ev.target.value, 10));
	}

	render() {
		let options = [10, 20, 50, 100, 1000].map((option, index) =>
			<option
				key={index}
				value={option}>
				{option}
			</option>
		);

		return (
			<select
				className="hire-faceted-search-results-rows"
				onChange={this.handleSelectChange.bind(this)}
				value={this.state.value}>
				{options}
			</select>
		);
	}
}

ResultsRows.propTypes = {
	rows: React.PropTypes.number
};

export default ResultsRows;