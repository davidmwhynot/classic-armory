// import
import React from 'react';
import ReactDOM from 'react-dom';

import * as Sentry from '@sentry/browser';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './store';
import App from './App';

import './index.css';

// config
Sentry.init({
	dsn: 'https://a26dd2b53458430f834e3244fc77dffe@sentry.io/1784460'
});

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
);
