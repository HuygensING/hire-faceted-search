import Immutable from "immutable";

import dispatcher from "../dispatcher";
import BaseStore from "./base";

const CHANGE_EVENT = "change";

class ConfigStore extends BaseStore {
	constructor() {
		super();

		this.data = new Immutable.Map({
			rows: 50
		});
	}

	getState() {
		return this.data;
	}

	init(data) {
		this.data = this.data.mergeDeep(Immutable.fromJS(data));
	}

	set(key, value) {
		this.data = this.data.set(key, value);
	}
}

let configStore = new ConfigStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "CONFIG_INIT":
			configStore.init(payload.action.data);
			break;
		case "CONFIG_SET":
			configStore.set(payload.action.key, payload.action.value);
			break;
		default:
			return;
	}

	configStore.emit(CHANGE_EVENT);
};

configStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default configStore;