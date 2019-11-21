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
			body: character.data
		};
	} catch (err) {
		console.error(err);

		sentry({ error: err });

		return {
			statusCode: 200,
			body: JSON.stringify({ error: err.message, message: err.stack, stack: err.stack })
		};
	}
};
