import dispatcher from "../dispatcher";

let queriesActions = {
	add(facetName, value) {
		dispatcher.handleViewAction({
			actionType: "QUERIES_ADD",
			facetName: facetName,
			value: value
		});
	}
};

export default queriesActions;