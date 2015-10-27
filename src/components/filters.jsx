import React from "react";

import TextSearch from "./text-search";
import ListFacet from "./list-facet";
import RangeFacet from "./range-facet";

let facetMap = {
	LIST(data, props, key) {
		let sort = (props.facetSortMap.hasOwnProperty(data.name)) ?
			props.facetSortMap[data.name] :
			null;

		return (<ListFacet
			data={data}
			key={key}
			labels={props.labels}
			onSelectFacetValue={props.onSelectFacetValue}
			queries={props.queries}
			sort={sort} />
		);
	},

	BOOLEAN(...args) {
		return this.LIST(...args);
	},

	RANGE(data, props, key) {
		return (<RangeFacet
			data={data}
			key={key}
			labels={props.labels}
			onSelectFacetRange={props.onSelectFacetRange}
			queries={props.queries} />
		);
	}
};

class Filters extends React.Component {
	onChangeFullTextField(field, value) {
		this.props.onChangeFullTextField(field, value);
	}

	renderFullTextSearch(field, i) {
		let foundFields = (this.props.queries.last.fullTextSearchParameters || []).filter((fld) => fld.name === field.name);
		let value = foundFields.length ? foundFields[0].term : "";
		return (
			<TextSearch field={field.name} key={i} labels={this.props.labels} onChangeSearchTerm={this.onChangeFullTextField.bind(this, field.name)} value={value} />
		);
	}

	renderFullTextSearches() {
		return {
			top: this.props.config.fullTextSearchFields.filter((field) => (field.position && field.position === "top") || !field.position).map(this.renderFullTextSearch.bind(this)),
			bottom: this.props.config.fullTextSearchFields.filter((field) => (field.position && field.position === "bottom")).map(this.renderFullTextSearch.bind(this))
		};
	}

	render() {
		let updateCount = (facetName) => {
			let found = this.props.results.last.facets.filter((facet) =>
				facet.name === facetName
			);

			return (found.length) ? found[0] : null;
		};


		let notNull = (facetName) =>
			facetName !== null;

		let toComponent = (data, index) =>
			facetMap[data.type](data, this.props, index);

		let facets = (this.props.facetList.length) ?
			this.props.facetList
				.map(updateCount)
				.filter(notNull) :
			this.props.results.last.facets;

		let freeTextSearch = this.props.config.hideFreeTextSearch ?
			null :
			<TextSearch	labels={this.props.labels} onChangeSearchTerm={this.props.onChangeSearchTerm} value={this.props.queries.last.term} />;

		let fullTextSearches = this.props.config.fullTextSearchFields ?
			this.renderFullTextSearches() :
			{top: null, bottom: null};

		return (
			<ul className="hire-faceted-search-filters">
				<button onClick={this.props.onNewSearch}>New search</button>
				{freeTextSearch}
				{fullTextSearches.top}
				{facets.map(toComponent)}
				{fullTextSearches.bottom}
			</ul>
		);
	}
}

Filters.defaultProps = {
	config: {hideFreeTextSearch: false},
	facetSortMap: {}
};

Filters.propTypes = {
	config: React.PropTypes.object,
	facetList: React.PropTypes.array,
	labels: React.PropTypes.object,
	onChangeFullTextField: React.PropTypes.func,
	onChangeSearchTerm: React.PropTypes.func,
	onNewSearch: React.PropTypes.func,
	onSelectFacetRange: React.PropTypes.func,
	onSelectFacetValue: React.PropTypes.func,
	queries: React.PropTypes.object,
	results: React.PropTypes.object
};

export default Filters;