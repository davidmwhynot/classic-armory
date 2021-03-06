import { SESSION_LOADED } from '../actions/types';

const initialState = {
	loaded: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SESSION_LOADED:
			return {
				...state,
				...action.payload.session,
				loaded: true
			};
		default:
			return state;
	}
}
