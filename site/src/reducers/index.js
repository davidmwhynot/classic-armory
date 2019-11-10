import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import globalReducer from './globalReducer';

export default combineReducers({
	session: sessionReducer,
	global: globalReducer
});
