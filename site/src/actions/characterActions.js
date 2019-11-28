import * as Sentry from '@sentry/browser';
import { push } from 'connected-react-router';

import { CHARACTER_LOADED } from './types';

export const loadCharacter = id => async dispatch => {
	try {
		const characterPayloadRaw = await fetch('/.netlify/functions/get', {
			method: 'POST',
			body: id,
			headers: { 'Content-Type': 'application/json' }
		});

		if (!characterPayloadRaw.ok) {
			throw Error(characterPayloadRaw.statusText);
		}

		const characterPayload = await characterPayloadRaw.json();

		if (!characterPayload.success) {
			Sentry.captureMessage(characterPayload.stack);
		}

		// load uploads
		const uploadsPayloadRaw = await fetch(
			'/.netlify/functions/get-uploads',
			{
				method: 'POST',
				body: JSON.stringify({
					name: characterPayload.name,
					realm: characterPayload.realm
				}),
				headers: { 'Content-Type': 'application/json' }
			}
		);

		if (!uploadsPayloadRaw.ok) {
			throw Error(uploadsPayloadRaw.statusText);
		}

		const uploadsPayload = await uploadsPayloadRaw.json();

		if (uploadsPayload.success) {
			dispatch({
				type: CHARACTER_LOADED,
				payload: {
					data: { ...characterPayload },
					uploads: [...uploadsPayload.uploads]
				}
			});
		} else {
			Sentry.captureMessage(uploadsPayload.stack);
		}
	} catch (err) {
		console.error(err);

		Sentry.captureException(err);
	}
};

export const createCharacter = data => async dispatch => {
	console.log('here');
	try {
		const rawRes = await fetch('/.netlify/functions/new', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' }
		});

		if (rawRes.ok) {
			const res = await rawRes.json();

			if (!res.error) {
				// this.setState({ loading: false });

				dispatch(push('/' + res.url));

				// this.props.history.push('/' + res.url);
			} else {
				console.error(res.stack);
				Sentry.captureMessage(res.stack);

				// console.log(res);

				// this.setState({
				// 	loading: false,
				// 	error: 'Something went wrong. Please try again.'
				// });
			}
		} else {
			throw Error(rawRes.statusText);
		}
	} catch (err) {
		console.error(err);
		Sentry.captureException(err);

		// this.setState({
		// 	loading: false,
		// 	error: 'Something went wrong. Please try again.'
		// });
	}
};
