import API from "../stores/api";

let resultsActions = {
	getAll() {
		API.getAllResults();
	},

	getResults() {
		API.getResults();
	}
};

export default resultsActions;