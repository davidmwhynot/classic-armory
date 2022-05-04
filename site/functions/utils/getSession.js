const Cryptr = require('cryptr');

const Session = require('../models/SessionModel');
const logo = require('./logo');

// env vars
const { CLASSICARMORY_SESSION_SECRET } = process.env;

// config
const { decrypt } = new Cryptr(CLASSICARMORY_SESSION_SECRET);

const createSession = data => {
	const newSession = new Session({ data });

	return newSession.save();
}

module.exports = (headers, data = {}) => {
	return new Promise(async resolve => {
		const parsedCookie = headers.cookie
			? headers.cookie.match(/_sess_v1=([a-z0-9]+);?/)
			: false;

		const cookie = parsedCookie ? parsedCookie[1] : false;

		if (!cookie) {
			return resolve(await createSession(data));
		}

		const oldSession = await Session.findOne({
			_id: decrypt(cookie)
		});

		// logo(oldSession, 'oldSession');

		if(!oldSession) {
			return resolve(await createSession(data));
		}

		oldSession.updated = Date.now();
		oldSession.data = {
			...oldSession.data,
			...data
		};

		return resolve(await oldSession.save());
	});
};
