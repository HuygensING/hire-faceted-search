import {combineReducers} from "redux";

import queries from "./queries";
import results from "./results";

export default combineReducers({
	config: (state={}) => state,
	labels: (state={}) => state,
	queries: queries,
	results: results
});