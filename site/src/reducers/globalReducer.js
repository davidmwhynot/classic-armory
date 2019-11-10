import { GLOBAL_LOADED } from '../actions/types';

const initialState = {
	loaded: false
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
