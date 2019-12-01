// import
const sentry = require('./utils/sentry');
const mongoose = require('mongoose');

const Character = require('./models/CharacterModel');

// config
const uri = `mongodb+srv://${process.env.CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;

// connect
mongoose.connect(uri, { useNewUrlParser: true });

// request handler
exports.handler = async function(event, context) {
	try {
		const req = event.body;
		const character = await Character.findOne({ _id: req });

		return {
			statusCode: 200,
			body: JSON.stringify({
				version: character.version,
				time: character.time,
				...JSON.parse(character.data)
			})
		};
	} catch (err) {
		// console.error(err);
		console.error('error');

		sentry({ error: err });

		return {
			statusCode: 200,
			body: JSON.stringify({ error: err.message, stack: err.stack })
		};
	}
};
