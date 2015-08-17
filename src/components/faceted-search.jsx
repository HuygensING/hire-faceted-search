import React from "react";
import Immutable from "immutable"

import TextSearch from "./text-search";
import ListFacet from "./list-facet";

class Facets extends React.Component {
	render() {
		let facets = this.props.facetData.get("facets").map((data, index) => {
			let selectedValues = this.props.selectedValues
				.find((values) =>	values.get("name") === data.get("name"));

			if (selectedValues != null) {
				selectedValues = selectedValues.get("values");
			}

			return (
				<ListFacet
					data={data}
					i18n={this.props.i18n}
					key={index}
					selectedValues={selectedValues} />);
			})

		return (
			<ul className="hire-faceted-search-facets">
				<TextSearch value={this.props.textValue} />
				{facets}
			</ul>
		);
	}
}

Facets.defaultProps = {
	selectedValues: new Immutable.List()
};

Facets.propTypes = {
	i18n: React.PropTypes.object,
	selectedValues: React.PropTypes.instanceOf(Immutable.List)
};

export default Facets;