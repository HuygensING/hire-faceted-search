import dispatcher from "../dispatcher";

let serverActions = {
	receiveAllResults(data) {
		dispatcher.handleServerAction({
			actionType: "RESULTS_RECEIVE_ALL",
			data: data
		});
	},

	receiveResults(data) {
		dispatcher.handleServerAction({
			actionType: "RESULTS_RECEIVE",
			data: data
		});
	}
};

export default serverActions;