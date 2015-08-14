import React from "react";

import FacetedSearch from "./components/faceted-search";
import Results from "./components/results";

import configActions from "./actions/config";
import resultsActions from "./actions/results";
import resultsStore from "./stores/results";
import queriesActions from "./actions/queries";
import queriesStore from "./stores/queries";

import SortableList from "./components/results/sort-menu/sortable-list";

class FacetedSearchController extends React.Component {
	constructor(props) {
		super(props);

		configActions.set(this.props.config);
		queriesActions.setDefaults(this.props);

		this.state = {
			queries: queriesStore.getState(),
			results: resultsStore.getState()
		};
	}

	componentDidMount() {
		resultsStore.listen(this.onStoreChange.bind(this));
		queriesStore.listen(this.onQueriesChange.bind(this));
		resultsActions.getAll();
	}

	componentWillUnmount() {
		resultsStore.stopListening(this.onStoreChange.bind(this));
		queriesStore.stopListening(this.onQueriesChange.bind(this));
	}

	onQueriesChange() {
		resultsActions.getResults();
	}

	onStoreChange() {
		this.setState({
			queries: queriesStore.getState(),
			results: resultsStore.getState()
		});
	}

	handleResultSelect(result) {
		this.props.onChange(result.toJS());
	}

	render() {
		let data = this.state.results.get("queryResults").size ?
			this.state.results.get("queryResults").last() :
			this.state.results.get("initResults");

		let facetedSearch = this.state.results.get("queryResults").size ?
			<FacetedSearch
				facetData={data}
				selectedValues={this.state.queries.get("facetValues")} /> :
			null;

		let results = (this.state.results.get("queryResults").size > 1) ?
			<Results
				facetData={data}
				onSelect={this.handleResultSelect.bind(this)}
				sortLevels={this.props.config.levels} /> :
			null;

		// TMP
		facetedSearch = null;
		results = null;
		// /TMP

		return (
			<div className="hire-faceted-search">
				<SortableList values={["aap", "boom", "cloaca"]} />
				{facetedSearch}
				{results}
			</div>
		);
	}
}

FacetedSearchController.defaultProps = {
	sortFields: []
};

FacetedSearchController.propTypes = {
	config: React.PropTypes.object.isRequired,
	onChange: React.PropTypes.func.isRequired,
	sortFields: React.PropTypes.array
};

export default FacetedSearchController;