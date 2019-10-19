import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

Sentry.init({
	dsn: 'https://a26dd2b53458430f834e3244fc77dffe@sentry.io/1784460'
});

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
