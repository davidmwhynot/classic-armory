import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export const history = createBrowserHistory();

const initialState = {
	session: {
		loaded: false
	},
	global: {
		loaded: false
	},
	character: {
		loaded: false
	}
};

let store;

if (process.env.NODE_ENV === 'production') {
	store = createStore(
		rootReducer(history),
		initialState,
		applyMiddleware(routerMiddleware(history), thunk)
	);
} else {
	const middleware = [routerMiddleware(history), thunk, logger];

	store = createStore(
		rootReducer(history),
		initialState,
		composeWithDevTools(applyMiddleware(...middleware))
	);
}

export default store;
