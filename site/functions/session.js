const sentry = require('./utils/sentry');

let encrypt;
let logo, getSession;

// env vars
const {
	NODE_ENV,
	CLASSICARMORY_DB_LOGIN,
	CLASSICARMORY_SESSION_SECRET
} = process.env;

const isProduction = NODE_ENV === 'production';

let setupError = false;

try {
	// import
	const mongoose = require('mongoose');
	const Cryptr = require('cryptr');

	// console.log(undef);

	const utils = require('./utils');
	logo = utils.logo;
	getSession = utils.getSession;

	// cryptr
	let cryptr = new Cryptr(CLASSICARMORY_SESSION_SECRET);
	encrypt = cryptr.encrypt;

	// connect
	const uri = `mongodb+srv://${CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;
	mongoose.connect(uri, { useNewUrlParser: true });
} catch (err) {
	setupError = err;

	sentry({ error: err });

	console.error(err);
}

// request handler
exports.handler = async function(event, context) {
	if (setupError) {
		return {
			statusCode: 200,
			body: JSON.stringify({
				success: false,
				error: setupError.message,
				stack: setupError.stack
			})
		};
	}

	try {
		let req;

		try {
			req = {
				data: JSON.parse(event.body),
				hasData: true,
				event
			};
		} catch (err) {
			console.error(err);

			req = {
				event,
				message: 'failed to parse event body',
				error: err,
				hasData: false
			};
		}

		let session;
		if (req.hasData) {
			session = await getSession(req.event.headers, req.data);
		} else {
			session = await getSession(req.event.headers);
		}

		const expiresDate = new Date(
			Date.now() + 10 * 365 * 24 * 60 * 60 * 1000
		);

		return {
			headers: {
				'Set-Cookie': `_sess_v1=${encrypt(
					session._id
				)}; Expires=${expiresDate.toUTCString()}; SameSite=strict;${
					isProduction ? ' Secure;' : ''
				} HttpOnly`
			},
			statusCode: 200,
			body: JSON.stringify({ success: true, session: session.data })
		};
	} catch (err) {
		console.error(err);

		sentry({ error: err });

		return {
			statusCode: 200,
			body: JSON.stringify({
				success: false,
				error: err.message,
				stack: err.stack
			})
		};
	}
};
