import { CHARACTER_LOADED } from './types';
import * as Sentry from '@sentry/browser';

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
