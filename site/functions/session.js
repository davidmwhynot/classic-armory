// import
const mongoose = require('mongoose');
const jsonColorizer = require('json-colorizer');
const Cryptr = require('cryptr');

const Session = require('./models/SessionModel');

// env vars
const {
	NODE_ENV,
	CLASSICARMORY_DB_LOGIN,
	CLASSICARMORY_SESSION_SECRET
} = process.env;

// let Character = null;
// if (NODE_ENV !== 'production') {
// 	Character = require('../new/CharacterModel');
// } else {
// 	Character = require('./Character');
// }
const Character = require('./models/CharacterModel');

// config
// const Schema = mongoose.Schema;
const uri = `mongodb+srv://${CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;
const { encrypt, decrypt } = new Cryptr(CLASSICARMORY_SESSION_SECRET);
const isProduction = NODE_ENV === 'production';

// connect
mongoose.connect(uri, { useNewUrlParser: true });

// request handler
exports.handler = async function(event, context) {
	try {
		let req = null;

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

		logo(req, '\n\n\nreq');

		const parsedCookie = req.event.headers.cookie
			? req.event.headers.cookie.match(/_sess=([a-z0-9]+);?/)
			: false;

		const cookie = parsedCookie ? parsedCookie[1] : false;
		// logo(cookie, 'cookie');

		const data = req.hasData ? { ...req.data } : {};
		let session;

		if (cookie) {
			const oldSession = await Session.findOne({ _id: decrypt(cookie) });

			logo(oldSession, 'oldSession');

			oldSession.updated = Date.now();
			oldSession.data = {
				...oldSession.data,
				...data
			};

			session = await oldSession.save();
		} else {
			const newSession = new Session({ data });

			session = await newSession.save();
		}

		logo(session, 'session');

		// const ran = Math.floor(Math.random() * 10);
		// console.log(notDefined);
		const expiresDate = new Date(
			Date.now() + 10 * 365 * 24 * 60 * 60 * 1000
		);
		console.log(expiresDate.toUTCString());

		return {
			headers: {
				'Set-Cookie': `_sess=${encrypt(
					session._id
				)}; Expires=${expiresDate.toUTCString()}; SameSite=strict;${
					isProduction ? ' Secure;' : ''
				} HttpOnly`
				// 'Set-Cookie': `_sess${ran}=${encrypt(savedSession._id)}`
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

function logo(o, ...s) {
	console.log(...s);
	console.log(jsonColorizer(JSON.stringify(o, null, '\t')));
}
