import {fetchResults} from "./results";

export function createNewQuery(dispatchData) {
	return function (dispatch) {
		dispatch(dispatchData);

		dispatch(fetchResults());
	};
}