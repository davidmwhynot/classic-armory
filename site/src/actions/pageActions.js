import { PAGE_LOADED } from './types';

export const pageLoaded = loc => async dispatch => {
	const payload = await (await fetch('/.netlify/functions/session', {
		method: 'POST',
		body: JSON.stringify({ loc }),
		headers: { 'Content-Type': 'application/json' }
	})).json();

	console.log(payload);

	payload.loading = false;

	dispatch({ type: PAGE_LOADED, payload });
};
