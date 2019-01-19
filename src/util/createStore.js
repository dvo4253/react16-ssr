import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../app/store/reducers/root';
import IS_CLIENT from './isClient';

export default (initialState, asyncMethods) => {
	/* eslint-disable no-underscore-dangle */
	const enhancer = compose(
		applyMiddleware(...[thunk.withExtraArgument({ ...asyncMethods })]),
		IS_CLIENT && window.__REDUX_DEVTOOLS_EXTENSION__
			? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
	);
	/* eslint-disable */
	return createStore(rootReducer, initialState, enhancer);
};
