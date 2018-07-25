import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../app/store/reducers/root';
import IS_CLIENT from './isClient';

export default (initialState, asyncMethods) => {
	const enhancer = compose(
		applyMiddleware(...[thunk.withExtraArgument({ ...asyncMethods })]),
		IS_CLIENT && window.devToolsExtension ? window.devToolsExtension() : f => f,
	);
	return createStore(rootReducer, initialState, enhancer);
};
