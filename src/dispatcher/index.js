import {Dispatcher} from "flux";

class AppDispatcher extends Dispatcher {
	handleViewAction(action) {
		console.log("VIEW_ACTION", action);

		return this.dispatch({
			source: "VIEW_ACTION",
			action: action
		});
	}

	handleServerAction(action) {
		console.log("SERVER_ACTION", action);

		return this.dispatch({
			source: "SERVER_ACTION",
			action: action
		});
	}
}

export default new AppDispatcher();