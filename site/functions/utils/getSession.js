const Cryptr = require('cryptr');

const Session = require('../models/SessionModel');
const logo = require('./logo');

// env vars
const { CLASSICARMORY_SESSION_SECRET } = process.env;

// config
const { decrypt } = new Cryptr(CLASSICARMORY_SESSION_SECRET);

module.exports = (headers, data = {}) => {
	return new Promise(async resolve => {
		const parsedCookie = headers.cookie
			? headers.cookie.match(/_sess=([a-z0-9]+);?/)
			: false;

		const cookie = parsedCookie ? parsedCookie[1] : false;

		let session;

		if (cookie) {
			const oldSession = await Session.findOne({
				_id: decrypt(cookie)
			});

			// logo(oldSession, 'oldSession');

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

		resolve(session);
	});
};
