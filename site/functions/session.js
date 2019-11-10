// import
const mongoose = require('mongoose');
const Cryptr = require('cryptr');

const { getSession, logo } = require('./utils');

// env vars
const {
	NODE_ENV,
	CLASSICARMORY_DB_LOGIN,
	CLASSICARMORY_SESSION_SECRET
} = process.env;

// config
const uri = `mongodb+srv://${CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;
const { encrypt } = new Cryptr(CLASSICARMORY_SESSION_SECRET);
const isProduction = NODE_ENV === 'production';

// connect
mongoose.connect(uri, { useNewUrlParser: true });

// request handler
exports.handler = async function(event, context) {
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

		// logo(session, 'session');

		const expiresDate = new Date(
			Date.now() + 10 * 365 * 24 * 60 * 60 * 1000
		);

		return {
			headers: {
				'Set-Cookie': `_sess=${encrypt(
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
