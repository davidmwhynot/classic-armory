// import
const mongoose = require('mongoose');

const Character = require('./models/CharacterModel');

// config
const uri = `mongodb+srv://${process.env.CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;

// connect
mongoose.connect(uri, { useNewUrlParser: true });

// request handler
exports.handler = async function(event, context) {
	try {
		const req = JSON.parse(event.body);
		const characters = await Character.find({
			name: req.name,
			realm: req.realm
		});

		const uploads = characters.map(character => ({
			_id: character._id,
			name: character.name,
			realm: character.realm,
			time: character.time
		}));

		return {
			statusCode: 200,
			body: JSON.stringify({
				success: true,
				uploads: uploads.reverse()
			})
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 200,
			body: JSON.stringify({
				success: false,
				error: err.stack
			})
		};
	}
};
