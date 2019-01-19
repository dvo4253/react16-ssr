import React from 'react';
import { hydrate, render } from 'react-dom';
import App from './App';
import appUtils from '../util';

const { createStore, makeFetch, makePost } = appUtils;
/* eslint-disable-next-line no-underscore-dangle */
const store = createStore(window.__STATE__, { makeFetch, makePost });

const renderEntry = (Component) => {
	hydrate(<Component store={store} />, document.getElementById('app'));
};

renderEntry(App);

/**
* This script provides hot module reloading in development mode.
*/
if (module.hot && process.env.NODE_ENV === 'development') {
	/* eslint-disable global-require */
	module.hot.accept('./App', () => {
		const reactApp = require('./App').default; /* eslint-disable-line global-require */
		render(reactApp);
	});

	module.hot.accept('./store/reducers/root', () => {
		const nextReducer = require('./store/reducers/root').default;
		store.replaceReducer(nextReducer);
	});
	/* eslint-disable */
}
