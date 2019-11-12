import { CHARACTER_LOADED } from '../actions/types';

const initialState = {
    loaded: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CHARACTER_LOADED:
            return {
                ...state,
                ...action.payload,
                loaded: true
            };
        default:
            return state;
    }
}
