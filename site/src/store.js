import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const initialState = {
	session: {
		loaded: false
	},
	global: {
		loaded: false
	}
};

let store;

if (process.env.NODE_ENV === 'production') {
	store = createStore(rootReducer, initialState, applyMiddleware(thunk));
} else {
	const middleware = [thunk, logger];

	store = createStore(
		rootReducer,
		initialState,
		composeWithDevTools(applyMiddleware(...middleware))
	);
}

export default store;
