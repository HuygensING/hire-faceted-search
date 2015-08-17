import dispatcher from "../dispatcher";

let queriesActions = {
	setDefaults(props) {
		dispatcher.handleViewAction({
			actionType: "QUERIES_SET_DEFAULTS",
			props: props,
		});
	},

	setSortParameter(field) {
		dispatcher.handleViewAction({
			actionType: "QUERIES_SET_SORT_PARAMETER",
			field: field,
		});
	},

	add(facetName, value) {
		dispatcher.handleViewAction({
			actionType: "QUERIES_ADD",
			facetName: facetName,
			value: value
		});
	},

	remove(facetName, value) {
		dispatcher.handleViewAction({
			actionType: "QUERIES_REMOVE",
			facetName: facetName,
			value: value
		});
	},

	changeSearchTerm(value) {
		dispatcher.handleViewAction({
			actionType: "QUERIES_CHANGE_SEARCH_TERM",
			value: value
		});
	}
};

export default queriesActions;