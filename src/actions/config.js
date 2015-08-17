import dispatcher from "../dispatcher";

let configActions = {
	init(data) {
		dispatcher.handleViewAction({
			actionType: "CONFIG_INIT",
			data: data
		});
	},

	set(key, value) {
		dispatcher.handleViewAction({
			actionType: "CONFIG_SET",
			key: key,
			value: value
		});
	}
};

export default configActions;