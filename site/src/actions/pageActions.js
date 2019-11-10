import { SESSION_LOADED, GLOBAL_LOADED } from './types';

export const pageLoaded = loc => async dispatch => {
	// load session
	const sessionPayload = await (await fetch('/.netlify/functions/session', {
		method: 'POST',
		body: JSON.stringify({ loc }),
		headers: { 'Content-Type': 'application/json' }
	})).json();
	console.log(sessionPayload);
	dispatch({ type: SESSION_LOADED, payload: sessionPayload });

	// load app state
	const globalPayload = await (await fetch(
		'/.netlify/functions/app-state'
	)).json();
	console.log(globalPayload);
	dispatch({ type: GLOBAL_LOADED, payload: globalPayload });
};
