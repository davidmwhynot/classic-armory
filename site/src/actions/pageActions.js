import { SESSION_LOADED, GLOBAL_LOADED } from './types';
import * as Sentry from '@sentry/browser';

export const loadPage = loc => async dispatch => {
    try {
        // load session
        const sessionPayloadRaw = await fetch('/.netlify/functions/session', {
            method: 'POST',
            body: JSON.stringify({ loc }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!sessionPayloadRaw.ok) {
            throw Error(sessionPayloadRaw.statusText);
        }

        const sessionPayload = await sessionPayloadRaw.json();

        console.log(sessionPayload);

        if (sessionPayload.success) {
            dispatch({ type: SESSION_LOADED, payload: sessionPayload });
        } else {
            Sentry.captureMessage(sessionPayload.stack);
        }

        // load app state
        const globalPayloadRaw = await fetch('/.netlify/functions/app-state');

        if (!globalPayloadRaw.ok) {
            throw Error(globalPayloadRaw.statusText);
        }
        const globalPayload = await globalPayloadRaw.json();

        console.log(globalPayload);

        if (globalPayload.success) {
            dispatch({ type: GLOBAL_LOADED, payload: globalPayload });
        } else {
            Sentry.captureMessage(globalPayload.stack);
        }
    } catch (err) {
        console.error(err);

        Sentry.captureException(err);
    }
};
