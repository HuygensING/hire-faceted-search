import React from "react";
import cx from "classnames";
import isEqual from "lodash.isequal";

import Filters from "./components/filters";
import Results from "./components/results";
import Loader from "./components/icons/loader-three-dots";

import {fetchResults, fetchNextResults} from "./actions/results";
import {selectFacetValue, selectFacetRange, newSearch, setSort, changeSearchTerm, changeFullTextSearchField, setFacetValues, removeFullTextSearchFields, setFullTextSearchFields} from "./actions/queries";

import {createStore, applyMiddleware} from "redux";
import reducers from "./reducers";
import thunkMiddleware from "redux-thunk";

import facetMap from "./components/facet-map";

//const logger = store => next => action => {
//	if (action.hasOwnProperty("type")) {
//		console.log("[FACETED SEARCH] " + action.type, action);
//	}
//
//   return next(action);
//};

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
		// Update the labels. Use case: when the user changes
		// the language.
		if (!isEqual(this.state.labels, nextProps.labels)) {
			this.store.dispatch({
				type: "SET_LABELS",
				labels: nextProps.labels
			});
		}

		// Set the next query. Use case: on forced rerender or
		// when passing query from one search to another.
		if (nextProps.query != null) {
			this.setQuery(nextProps.query);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.results.last !== nextState.results.last;
	}

	componentWillUpdate(nextProps, nextState) {
		if(this.props.onChange) {
			this.props.onChange(nextState.results.last, nextState.queries.last);
		}

		if(this.props.onSearchId) {
			this.props.onSearchId(nextState.results.searchId);
		}

		if(this.state.queries.last.sortParameters.length === 0) {
			this.store.dispatch({
				type: "INIT_SORT_PARAMS",
				sortableFields: nextState.results.last.sortableFields
			});
		}
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	setQuery(nextQuery) {
		if (nextQuery.facetValues && !isEqual(nextQuery.facetValues, this.state.queries.last.facetValues)) {
			this.store.dispatch(setFacetValues(nextQuery.facetValues));
		}

		if (nextQuery.fullTextSearchParameters && !isEqual(nextQuery.fullTextSearchParameters, this.state.queries.last.fullTextSearchParameters)) {
			if (nextQuery.fullTextSearchParameters.length) {
				this.store.dispatch(setFullTextSearchFields(nextQuery.fullTextSearchParameters));
			} else if (this.state.queries.last.fullTextSearchParameters) {
				this.store.dispatch(removeFullTextSearchFields());
			}
		}
	}

	handleFetchNextResults(url) {
		this.store.dispatch(fetchNextResults(url));
	}

	handleSelectFacetValue(facetName, value, remove) {
		this.store.dispatch(selectFacetValue(facetName, value, remove));
	}

	render() {
		let loader, filters, results;

		if (this.state.results.all.length === 0) {
			loader = <Loader className="loader" />;
		} else {
			let FiltersComponent = (this.props.customComponents.filters != null) ?
				this.props.customComponents.filters :
				Filters;

			filters = (
				<FiltersComponent
					{...this.props}
					{...this.state}
					onChangeFullTextField={(field, value) =>
						this.store.dispatch(changeFullTextSearchField(field, value))
					}
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
					} />
			);

			results = (
				<Results
					{...this.props}
					{...this.state}
					onChangeFullTextField={(field, value) =>
						this.store.dispatch(changeFullTextSearchField(field, value))
					}
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
					}/>
			);
		}

		return (
			<div className={cx(
				"hire-faceted-search",
				this.props.className
			)}>
				{loader}
				{filters}
				{results}
			</div>
		);
	}
}

FacetedSearch.defaultProps = {
	className: "",
	customComponents: {
		currentQuery: null,
		filters: null,
		result: null
	},
	facetList: [],
	labels: {},
	metadataList: []
};

FacetedSearch.propTypes = {
	className: React.PropTypes.string,
	config: React.PropTypes.object.isRequired,
	customComponents: React.PropTypes.object,
	facetList: React.PropTypes.array,
	facetSortMap: React.PropTypes.object,
	labels: React.PropTypes.object,
	metadataList: React.PropTypes.array,
	numberedResults: React.PropTypes.bool,
	onChange: React.PropTypes.func,
	onSearchId: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	query: React.PropTypes.object
};

export {facetMap};
export default FacetedSearch;