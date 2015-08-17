import API from "../stores/api";

let resultsActions = {
	getAll() {
		API.getAllResults();
	},

	getResults() {
		API.getResults();
	},

	getResultsFromUrl(url) {
		API.getResultsFromUrl(url);
	}
};

export default resultsActions;