import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import globalReducer from './globalReducer';
import characterReducer from './characterReducer';

export default combineReducers({
    session: sessionReducer,
    global: globalReducer,
    character: characterReducer
});
