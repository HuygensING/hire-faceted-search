import dispatcher from "../dispatcher";

let queriesActions = {
	setDefaults(props) {
		dispatcher.handleViewAction({
			actionType: "QUERIES_SET_DEFAULTS",
			props: props,
		});
	},

	add(facetName, value) {
		dispatcher.handleViewAction({
			actionType: "QUERIES_ADD",
			facetName: facetName,
			value: value
		});
	}
};

export default queriesActions;