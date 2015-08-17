import React from "react";
import Immutable from "immutable";

import FacetedSearch from "./components/faceted-search";
import Results from "./components/results";

import configActions from "./actions/config";
import configStore from "./stores/config";
import resultsActions from "./actions/results";
import resultsStore from "./stores/results";
import queriesActions from "./actions/queries";
import queriesStore from "./stores/queries";

import SortableList from "./components/results/sort-menu";

import i18n from "./i18n";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class FacetedSearchController extends React.Component {
	constructor(props) {
		super(props);

		configActions.init(this.props.config);
		queriesActions.setDefaults(this.props.config);

		this.onConfigChange = this.onConfigChange.bind(this)
		this.onResultsChange = this.onResultsChange.bind(this)
		this.onQueriesChange = this.onQueriesChange.bind(this)

		this.state = {
			config: configStore.getState(),
			i18n: Object.assign(i18n, this.props.i18n),
			queries: queriesStore.getState(),
			results: resultsStore.getState()
		};
	}

	componentDidMount() {
		configStore.listen(this.onConfigChange);
		resultsStore.listen(this.onResultsChange);
		queriesStore.listen(this.onQueriesChange);
		resultsActions.getAll();
	}

	componentWillReceiveProps(nextProps) {
		let oldI18n = Immutable.fromJS(this.state.i18n);
		let newI18n = Immutable.fromJS(nextProps.i18n);

		if (!newI18n.equals(oldI18n)) {
			this.setState({
				i18n: Object.assign(i18n, nextProps.i18n)
			});
		}
	}

	componentWillUnmount() {
		configStore.stopListening(this.onConfigChange);
		resultsStore.stopListening(this.onResultsChange);
		queriesStore.stopListening(this.onQueriesChange);
	}

	onQueriesChange() {
		resultsActions.getResults();
	}

	onConfigChange() {
		if (this.state.config.get("rows") !== configStore.getState().get("rows")) {
			resultsActions.getResults();
		}

		this.setState({
			config: configStore.getState()
		})
	}

	onResultsChange() {
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
				i18n={this.state.i18n}
				textValue={this.state.queries.get("term")}
				selectedValues={this.state.queries.get("facetValues")} /> :
			null;

		let results = (this.state.results.get("queryResults").size > 0) ?
			<Results
				rows={this.state.config.get("rows")}
				facetData={data}
				i18n={this.state.i18n}
				onSelect={this.handleResultSelect.bind(this)}
				sortParameters={this.state.queries.get("sortParameters")} /> :
			null;

		return (
			<div className="hire-faceted-search">
				{facetedSearch}
				{results}
			</div>
		);
	}
}

FacetedSearchController.defaultProps = {
	i18n: {}
};

FacetedSearchController.propTypes = {
	config: React.PropTypes.object.isRequired,
	i18n: React.PropTypes.object,
	onChange: React.PropTypes.func.isRequired
};

export default FacetedSearchController;