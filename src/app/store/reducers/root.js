import { combineReducers } from 'redux';
import { PING, PONG } from '../actions';

const pingReducer = (state = { isPinging: false }, action) => {
	switch (action.type) {
	case PING:
		return { isPinging: true };

	case PONG:
		return { isPinging: false };

	default:
		return state;
	}
};

const rootReducer = combineReducers({
	ui: pingReducer,
	data: (state = {}) => state,
});

export default rootReducer;
