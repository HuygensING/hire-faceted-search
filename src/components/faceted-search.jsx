import React from "react";

import ListFacet from "./list-facet";

class FacetedSearch extends React.Component {
	render() {
		let facets = this.props.facetData.get("facets").map((data) =>
			<ListFacet
				data={data}
				key={data.name} />);

		return (
			<ul>
				{facets}
			</ul>
		);
	}
}

FacetedSearch.defaultProps = {

};

FacetedSearch.propTypes = {

};

export default FacetedSearch;