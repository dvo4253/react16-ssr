import React from 'react';
import { Provider } from 'react-redux'

export default ({ store }) => (
	<Provider store={store}>
		<div>
			This a basic SSR React app rendered using pug as a template engine on the server.
	</div>
	</Provider>
);
