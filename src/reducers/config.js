let initialState = {
	rows: 50
};

export default function(state={}, action) {
	switch (action.type) {
		case "SET_CONFIG_DEFAULTS":
			let initConfig = {...initialState, ...action.config};

			return {...state, ...initConfig};
		default:
			return state;
	}
}