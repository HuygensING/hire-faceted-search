import React from "react";

class FacetValue extends React.Component {

	renderValue() {
		if(this.props.range) {
			return Math.floor(this.props.range.lowerLimit * 0.0001) + " - " + Math.floor(this.props.range.upperLimit * 0.0001);
		} else {
			return this.props.value;
		}
	}

	render() {
		return (
			<li
				className="hire-faceted-search-selected-facet-value"
				onClick={this.props.onSelectFacetValue.bind(this, this.props.facetName, this.props.value, true)}>
				{this.renderValue()}
			</li>
		);
	}
}

FacetValue.propTypes = {
	facetName: React.PropTypes.string,
	onSelectFacetValue: React.PropTypes.func,
	range: React.PropTypes.object,
	value: React.PropTypes.string
};

export default FacetValue;