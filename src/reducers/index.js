import {combineReducers} from "redux";

import queries from "./queries";
import config from "./config";

export default combineReducers({
	config: config,
	queries: queries
});