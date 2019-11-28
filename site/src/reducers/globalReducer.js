import { GLOBAL_LOADED } from '../actions/types';

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
		default:
			return state;
	}
}
