import React from "react";
import isEqual from "lodash.isequal";

import Facets from "./components/facets";
import Results from "./components/results";
import Loader from "./components/icons/loader-three-dots";

import {fetchResults, fetchNextResults} from "./actions/results";
import {selectFacetValue, newSearch, setSort, changeSearchTerm} from "./actions/queries";

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

	handleFetchNextResults(url) {
		store.dispatch(fetchNextResults(url));
	}

	handleSelectFacetValue(facetName, value, remove) {
		store.dispatch(selectFacetValue(facetName, value, remove));
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
					facetList={this.props.facetList}
					labels={this.state.labels}
					onChangeSearchTerm={(value) =>
						store.dispatch(changeSearchTerm(value))
					}
					onNewSearch={() =>
						store.dispatch(newSearch())
					}
					onSelectFacetValue={(...args) =>
						store.dispatch(selectFacetValue(...args))
					}
					queries={this.state.queries}
					results={this.state.results} />
				<Results
					config={this.state.config}
					labels={this.state.labels}
					onChangeSearchTerm={(value) =>
						store.dispatch(changeSearchTerm(value))
					}
					onFetchNextResults={(url) =>
						store.dispatch(fetchNextResults(url))
					}
					onSelect={(item) =>
						this.props.onSelect(item)
					}
					onSelectFacetValue={(...args) =>
						store.dispatch(selectFacetValue(...args))
					}
					onSetSort={(field) =>
						store.dispatch(setSort(field))
					}
					queries={this.state.queries}
					results={this.state.results} />
			</div>
		);
	}
}

FacetedSearch.defaultProps = {
	facetList: [],
	labels: {}
};

FacetedSearch.propTypes = {
	config: React.PropTypes.object.isRequired,
	facetList: React.PropTypes.array,
	labels: React.PropTypes.object,
	onChange: React.PropTypes.func,
	onSelect: React.PropTypes.func
};

export default FacetedSearch;