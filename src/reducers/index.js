import {combineReducers} from "redux";

import config from "./config";
import labels from "./labels";
import queries from "./queries";
import results from "./results";

export default combineReducers({
	config: config,
	labels: labels,
	queries: queries,
	results: results
});