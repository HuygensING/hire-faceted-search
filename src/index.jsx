import React from "react";
import isEqual from "lodash.isequal";

import Facets from "./components/facets";
import Results from "./components/results";
import Loader from "./components/icons/loader-three-dots";

import {fetchResults, fetchNextResults} from "./actions/results";
import {selectFacetValue, selectFacetRange, newSearch, setSort, changeSearchTerm} from "./actions/queries";

import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";

// const logger = store => next => action => {
// 	if (action.hasOwnProperty("type")) {
// 		console.log(action.type, action);
// 	}

//   return next(action);
// };

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class FacetedSearch extends React.Component {
	constructor(props) {
		super(props);
		this.store = createStoreWithMiddleware(reducers);

		this.store.dispatch({
			type: "SET_QUERY_DEFAULTS",
			config: this.props.config
		});

		this.store.dispatch({
			type: "SET_CONFIG_DEFAULTS",
			config: this.props.config
		});

		this.store.dispatch({
			type: "SET_LABELS",
			labels: this.props.labels
		});

		this.state = this.store.getState();
	}

	componentDidMount() {
		this.unsubscribe = this.store.subscribe(() =>
			this.setState(this.store.getState())
		);

		this.store.dispatch(fetchResults());
	}

	componentWillReceiveProps(nextProps) {
		if (!isEqual(this.state.labels, nextProps.labels)) {
			this.store.dispatch({
				type: "SET_LABELS",
				labels: nextProps.labels
			});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		let resultsChanged = this.state.results.last !== nextState.results.last;

		if (resultsChanged) {
			if(this.props.onChange) { this.props.onChange(nextState.results.last, nextState.queries.last); }
			if(this.state.queries.last.sortParameters.length === 0) {
				this.store.dispatch({
					type: "INIT_SORT_PARAMS",
					sortableFields: nextState.results.last.sortableFields
				});
			}
		}
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	handleFetchNextResults(url) {
		this.store.dispatch(fetchNextResults(url));
	}

	handleSelectFacetValue(facetName, value, remove) {
		this.store.dispatch(selectFacetValue(facetName, value, remove));
	}

	render() {
		let className = this.props.className !== "" ?
			"hire-faceted-search " + this.props.className :
			"hire-faceted-search";

		if (this.state.results.all.length === 0) {
			return (
				<div className={className}>
					<Loader className="loader" />
				</div>
			);
		}

		return (
			<div className={className}>
				<Facets
					facetList={this.props.facetList}
					facetSortMap={this.props.facetSortMap}
					labels={this.state.labels}
					onChangeSearchTerm={(value) =>
						this.store.dispatch(changeSearchTerm(value))
					}
					onNewSearch={() =>
						this.store.dispatch(newSearch())
					}
					onSelectFacetRange={(...args) =>
						this.store.dispatch(selectFacetRange(...args))
					}
					onSelectFacetValue={(...args) =>
						this.store.dispatch(selectFacetValue(...args))
					}
					queries={this.state.queries}
					results={this.state.results} />
				<Results
					config={this.state.config}
					labels={this.state.labels}
					metadataList={this.props.metadataList}
					numberedResults={this.props.numberedResults}
					onChangeSearchTerm={(value) =>
						this.store.dispatch(changeSearchTerm(value))
					}
					onFetchNextResults={(url) =>
						this.store.dispatch(fetchNextResults(url))
					}
					onSelect={this.props.onSelect}
					onSelectFacetValue={(...args) =>
						this.store.dispatch(selectFacetValue(...args))
					}
					onSetSort={(field) =>
						this.store.dispatch(setSort(field))
					}
					queries={this.state.queries}
					resultComponent={this.props.resultComponent}
					results={this.state.results} />
			</div>
		);
	}
}

FacetedSearch.defaultProps = {
	className: "",
	facetList: [],
	metadataList: [],
	labels: {}
};

FacetedSearch.propTypes = {
	className: React.PropTypes.string,
	config: React.PropTypes.object.isRequired,
	facetList: React.PropTypes.array,
	facetSortMap: React.PropTypes.object,
	labels: React.PropTypes.object,
	metadataList: React.PropTypes.array,
	numberedResults: React.PropTypes.bool,
	onChange: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	resultComponent: React.PropTypes.func
};

export default FacetedSearch;