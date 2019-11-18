import { GLOBAL_LOADED, CHARACTER_UPLOADED } from '../actions/types';
import history from '../history';

const initialState = {
	loaded: false,
	page: {
		url: '/'
	}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GLOBAL_LOADED:
			return {
				...state,
				...action.payload.global,
				loaded: true
			};
		case CHARACTER_UPLOADED:
			history.push(action.payload);

			return {
				...state
			};
		default:
			return state;
	}
}
