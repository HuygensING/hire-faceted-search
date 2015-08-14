import Immutable from "immutable";

import dispatcher from "../dispatcher";
import BaseStore from "./base";

const CHANGE_EVENT = "change";

class ConfigStore extends BaseStore {
	constructor() {
		super();

		this.data = new Immutable.Map();
	}

	getState() {
		return this.data;
	}

	set(data) {
		this.data = Immutable.fromJS(data);
	}
}

let configStore = new ConfigStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "CONFIG_SET":
			configStore.set(payload.action.data);
			break;
		default:
			return;
	}

	configStore.emit(CHANGE_EVENT);
};

configStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default configStore;