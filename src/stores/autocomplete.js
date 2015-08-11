// // TODO Remove uncamel cased vars
// import Immutable from "immutable";

// import dispatcher from "../dispatcher";

// import BaseStore from "./base";

// const CHANGE_EVENT = "change";

// class AutocompleteStore extends BaseStore {
// 	constructor() {
// 		super();

// 		this.data = {
// 			languages: new Immutable.List()
// 		}
// 	}

// 	getState() {
// 		return this.data;
// 	}

// 	receiveLanguages(data) {
// 		this.data.languages = Immutable.fromJS(data);
// 	}
// }

// let autocompleteStore = new AutocompleteStore();

// let dispatcherCallback = function(payload) {
// 	switch(payload.action.actionType) {
// 		case "LANGUAGES_RECEIVE":
// 			autocompleteStore.receiveLanguages(payload.action.data);
// 			break;
// 		default:
// 			return;
// 	}

// 	autocompleteStore.emit(CHANGE_EVENT);
// };

// autocompleteStore.dispatcherIndex = dispatcher.register(dispatcherCallback);

// export default autocompleteStore;