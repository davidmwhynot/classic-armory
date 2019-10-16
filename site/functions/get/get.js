// import
const mongoose = require('mongoose');
const Character = require('../new/CharacterModel');

// config
const uri = `mongodb+srv://${process.env.CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;

// connect
mongoose.connect(uri, { useNewUrlParser: true });

// request handler
exports.handler = async function(event, context) {
	try {
		const req = event.body;
		console.log('req');
		console.log(req);

		// console.log('Character', Character);
		const character = await Character.findOne({ _id: req });
		console.log('character._id');
		console.log(character._id);

		return {
			statusCode: 200,
			body: character.data
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 200,
			body: JSON.stringify({ error: err.message })
		};
	}
};
