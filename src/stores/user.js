import Immutable from "immutable";

import dispatcher from "../dispatcher";
import BaseStore from "./base";

const userModel = new Immutable.Map({
	displayName: "",
	email: "",
	token: null
});

const CHANGE_EVENT = "change";

class UserStore extends BaseStore {
	constructor() {
		super();

		this.user = userModel;
	}

	getState() {
		return {
			authenticated: this.user.get("token") != null,
			user: this.user
		};
	}

	receive(data) {
		this.user = this.user.mergeDeep(Immutable.fromJS(data));
	}
}

let userStore = new UserStore();

let dispatcherCallback = function(payload) {
	switch(payload.action.actionType) {
		case "USER_RECEIVE":
			userStore.receive(payload.action.data);
			break;
		default:
			return;
	}

	userStore.emit(CHANGE_EVENT);
};

userStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

export default userStore;