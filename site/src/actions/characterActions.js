import { CHARACTER_LOADED } from './types';
import * as Sentry from '@sentry/browser';

export const loadCharacter = (name, realm) => async dispatch => {
    try {
        // load uploads
        const uploadsPayloadRaw = await fetch(
            '/.netlify/functions/get-uploads',
            {
                method: 'POST',
                body: JSON.stringify({ name, realm }),
                headers: { 'Content-Type': 'application/json' }
            }
        );

        if (!uploadsPayloadRaw.ok) {
            throw Error(uploadsPayloadRaw.statusText);
        }

        const uploadsPayload = await uploadsPayloadRaw.json();

        console.log('uploadsPayload');
        console.log(uploadsPayload);

        if (uploadsPayload.success) {
            dispatch({ type: CHARACTER_LOADED, payload: uploadsPayload });
        } else {
            Sentry.captureMessage(uploadsPayload.stack);
        }
    } catch (err) {
        console.error(err);

        Sentry.captureException(err);
    }
};
