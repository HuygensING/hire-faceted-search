import React from "react";
import Immutable from "immutable"

import TextSearch from "./text-search";
import ListFacet from "./list-facet";

class FacetedSearch extends React.Component {
	render() {
		let facets = this.props.facetData.get("facets").map((data, index) => {
			let selectedValues = this.props.selectedValues
				.find((values) =>	values.get("name") === data.get("name"));

			if (selectedValues != null) {
				selectedValues = selectedValues.get("values");
			}

			return (
				<ListFacet
					selectedValues={selectedValues}
					data={data}
					key={index} />);
			})

		return (
			<ul>
				<TextSearch />
				{facets}
			</ul>
		);
	}
}

FacetedSearch.defaultProps = {
	selectedValues: new Immutable.List()
};

FacetedSearch.propTypes = {
	selectedValues: React.PropTypes.instanceOf(Immutable.List)
};

export default FacetedSearch;