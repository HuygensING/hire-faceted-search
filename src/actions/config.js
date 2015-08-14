import dispatcher from "../dispatcher";

let configActions = {
	set(data) {
		dispatcher.handleViewAction({
			actionType: "CONFIG_SET",
			data: data
		});
	}
};

export default configActions;