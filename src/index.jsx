import React from "react";
import isEqual from "lodash.isequal";

import Facets from "./components/facets";
import Results from "./components/results";
import Loader from "./components/icons/loader-three-dots";

import {fetchResults, fetchNextResults} from "./actions/results";
import {createNewQuery} from "./actions/queries";

import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";

const logger = store => next => action => {
	if (action.hasOwnProperty("type")) {
		console.log(action.type, action);
	}

  return next(action);
};

let createStoreWithMiddleware = applyMiddleware(logger, thunkMiddleware)(createStore);
let store = createStoreWithMiddleware(reducers);

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class FacetedSearch extends React.Component {
	constructor(props) {
		super(props);

		store.dispatch({
			type: "SET_QUERY_DEFAULTS",
			config: this.props.config
		});

		store.dispatch({
			type: "SET_CONFIG_DEFAULTS",
			config: this.props.config
		});

		store.dispatch({
			type: "SET_LABELS",
			labels: this.props.labels
		});

		this.state = store.getState();
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe(() =>
			this.setState(store.getState())
		);

		store.dispatch(fetchResults());
	}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(this.state.labels, nextProps.labels)) {
			store.dispatch({
				type: "SET_LABELS",
				labels: nextProps.labels
			});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		let resultsChanged = this.state.results.last !== nextState.results.last;

		if (resultsChanged) {
			this.props.onChange(nextState.results.last, nextState.queries.last);
		}
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleSelect(result) {
		this.props.onSelect(result);
	}

	handleFetchNextResults(url) {
		store.dispatch(fetchNextResults(url));
	}

	handleSelectFacetValue(facetName, value, remove) {
		let part1 = {
			facetName: facetName,
			value: value
		};

		let part2 = remove ?
			{type: "REMOVE_FACET_VALUE"} :
			{type: "ADD_FACET_VALUE"};

		store.dispatch(createNewQuery(
			Object.assign(part1, part2)
		));
	}

	handleSetSort(field) {
		store.dispatch(createNewQuery({
			type: "SET_RESULTS_SORT",
			field: field
		}));
	}

	handleChangeSearchTerm(value) {
		store.dispatch(createNewQuery({
			type: "CHANGE_SEARCH_TERM",
			value: value
		}));
	}

	handleReset() {
		store.dispatch(createNewQuery({
			type: "RESET"
		}));
	}

	render() {
		if (this.state.results.all.length === 0) {
			return (
				<div className="hire-faceted-search">
					<Loader className="loader" />
				</div>
			);
		}

		return (
			<div className="hire-faceted-search">
				<Facets
					labels={this.state.labels}
					onChangeSearchTerm={this.handleChangeSearchTerm.bind(this)}
					onReset={this.handleReset.bind(this)}
					onSelectFacetValue={this.handleSelectFacetValue.bind(this)}
					queries={this.state.queries}
					results={this.state.results} />
				<Results
					config={this.state.config}
					labels={this.state.labels}
					onChangeSearchTerm={this.handleChangeSearchTerm.bind(this)}
					onFetchNextResults={this.handleFetchNextResults.bind(this)}
					onSelect={this.handleSelect.bind(this)}
					onSelectFacetValue={this.handleSelectFacetValue.bind(this)}
					onSetSort={this.handleSetSort.bind(this)}
					queries={this.state.queries}
					results={this.state.results} />
			</div>
		);
	}
}

FacetedSearch.defaultProps = {
	labels: {}
};

FacetedSearch.propTypes = {
	config: React.PropTypes.object.isRequired,
	labels: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onSelect: React.PropTypes.func
};

export default FacetedSearch;