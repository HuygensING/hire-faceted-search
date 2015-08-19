// import dispatcher from "../dispatcher";

// let queriesActions = {
// 	setDefaults(props) {
// 		dispatcher.handleViewAction({
// 			actionType: "QUERIES_SET_DEFAULTS",
// 			props: props,
// 		});
// 	},

// 	setSortParameter(field) {
// 		dispatcher.handleViewAction({
// 			actionType: "QUERIES_SET_SORT_PARAMETER",
// 			field: field,
// 		});
// 	},

// 	add(facetName, value) {
// 		dispatcher.handleViewAction({
// 			actionType: "QUERIES_ADD",
// 			facetName: facetName,
// 			value: value
// 		});
// 	},

// 	remove(facetName, value) {
// 		dispatcher.handleViewAction({
// 			actionType: "QUERIES_REMOVE",
// 			facetName: facetName,
// 			value: value
// 		});
// 	},

// 	reset() {
// 		dispatcher.handleViewAction({
// 			actionType: "QUERIES_RESET"
// 		});
// 	},

// 	changeSearchTerm(value) {
// 		dispatcher.handleViewAction({
// 			actionType: "QUERIES_CHANGE_SEARCH_TERM",
// 			value: value
// 		});
// 	}
// };

// setDefaults(config) {
// 		let sortLevels = Immutable.fromJS(config.levels);
// 		let sortParameters = sortLevels.map((fieldName) =>
// 			new Immutable.Map({
// 				fieldname: fieldName,
// 				direction: "asc"
// 			}));

// 		this.model = this.data.withMutations((map) => {
// 			map.set("sortParameters", sortParameters);
// 			map.set("resultFields", sortLevels);
// 		});

// 		this.data = this.model;
// 	}




let initialState = {
	queries: [],
	queryModel: {
		"facetValues": [],
		"searchInAnnotations": true,
		"searchInTranscriptions": true,
		"term": "",
		"textLayers": ["Diplomatic", "Opmerkingen en verwijzingen", "Comments and References", "Transcription", "Transcripción", "Transcriptie", "Vertaling", "Translation", "Traducción", "Comentarios y referencias"]
	}
}

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_QUERY_DEFAULTS":
			let newQueryModel = {
				queryModel: {...initialState.queryModel, ...{
					sortLevels: action.config.levels,
					sortParameters: action.config.levels.map((level) => {
						return {
							fieldname: level,
							direction: "asc"
						};
					})
				}}
			}

			return {...state, ...newQueryModel}
		default:
			return state;
	}
}