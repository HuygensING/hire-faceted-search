import React from "react";
// import Immutable from "immutable";

import Facets from "./components/facets";
import Results from "./components/results";

import {fetchResults, fetchResultsFromUrl} from "./actions/results";
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

		this.state = store.getState();
	}

	componentDidMount() {
		this.unsubscribe = store.subscribe(() =>
			this.setState(store.getState())
		);

		store.dispatch(fetchResults());
	}

	// componentWillReceiveProps(nextProps) {
		// let oldI18n = Immutable.fromJS(this.state.i18n);
		// let newI18n = Immutable.fromJS(nextProps.i18n);

		// if (!newI18n.equals(oldI18n)) {
		// 	this.setState({
		// 		i18n: Object.assign(i18n, nextProps.i18n)
		// 	});
		// }
	// }

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleResultSelect(result) {
		this.props.onChange(result.toJS());
	}

	handleFetchResultsFromUrl(url) {
		store.dispatch(fetchResultsFromUrl(url));
	}

	handleSelectFacetValue(facetName, value, remove) {
		let part1 = {
			facetName: facetName,
			value: value
		};

		let part2 = remove ?
			{type: "REMOVE_FACET_VALUE"} :
			{type: "ADD_FACET_VALUE"};

		store.dispatch(createNewQuery(Object.assign(part1, part2)));
	}

	handleSetSort(field) {
		store.dispatch(createNewQuery({
			type: "SET_RESULTS_SORT",
			field: field
		}));
	}

	render() {
		if (this.state.results.all.length === 0) {
			return (<div>LAODING</div>);
		}

		return (
			<div className="hire-faceted-search">
				<Facets
					labels={this.state.labels}
					onSelectFacetValue={this.handleSelectFacetValue.bind(this)}
					queries={this.state.queries}
					results={this.state.results} />
				<Results
					config={this.state.config}
					labels={this.state.labels}
					onFetchResultsFromUrl={this.handleFetchResultsFromUrl.bind(this)}
					onSelect={this.handleResultSelect.bind(this)}
					onSetSort={this.handleSetSort.bind(this)}
					queries={this.state.queries}
					results={this.state.results} />
			</div>
		);
	}
}

FacetedSearch.defaultProps = {
};

FacetedSearch.propTypes = {
	config: React.PropTypes.object.isRequired,
	labels: React.PropTypes.object,
	onChange: React.PropTypes.func.isRequired
};

export default FacetedSearch;