import React from "react";

import queriesActions from "../../../../actions/queries";

// let fs = require("fs");
// import insertCss from "insert-css";
// let css = fs.readFileSync(__dirname + "/index.css");
// insertCss(css, {prepend: true});

class FacetValue extends React.Component {
	handleFacetValueClick() {
		queriesActions.remove(this.props.facetName, this.props.value);
	}

	render() {
		return (
			<li
				className="hire-faceted-search-selected-facet-value"
				onClick={this.handleFacetValueClick.bind(this)}>
				{this.props.value}
			</li>
		);
	}
}

FacetValue.propTypes = {
	facetName: React.PropTypes.string,
	value: React.PropTypes.string
}

export default FacetValue;