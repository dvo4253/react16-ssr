import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	ui: (state = {}) => state,
	data: (state = {}) => state,
});

export default rootReducer;
