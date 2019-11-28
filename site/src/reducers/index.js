import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import sessionReducer from './sessionReducer';
import globalReducer from './globalReducer';
import characterReducer from './characterReducer';

export default history =>
	combineReducers({
		router: connectRouter(history),
		session: sessionReducer,
		global: globalReducer,
		character: characterReducer
	});
