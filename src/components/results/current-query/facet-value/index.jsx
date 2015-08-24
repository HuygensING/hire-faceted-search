import React from "react";

class FacetValue extends React.Component {
	render() {
		return (
			<li
				className="hire-faceted-search-selected-facet-value"
				onClick={this.props.onSelectFacetValue.bind(this, this.props.facetName, this.props.value, true)}>
				{this.props.value}
			</li>
		);
	}
}

FacetValue.propTypes = {
	facetName: React.PropTypes.string,
	onSelectFacetValue: React.PropTypes.func,
	value: React.PropTypes.string
};

export default FacetValue;