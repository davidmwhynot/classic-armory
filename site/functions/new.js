// import
const mongoose = require('mongoose');

const { get } = require('axios');
const { Parser } = require('xml2js');

const { getSession } = require('./utils');

const Character = require('./models/CharacterModel');

// config
const uri = `mongodb+srv://${process.env.CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;

// connect
mongoose.connect(uri, { useNewUrlParser: true });

// request handler
exports.handler = async function(event, context) {
	try {
		const req = JSON.parse(event.body);

		const parser = new Parser();

		const charData = {
			name: req.name,
			realm: req.realm,
			guild: req.guild,
			race: req.race,
			level: req.level,
			class: req.class,
			items: {}
		};

		for (const item of req.items) {
			const key = Object.keys(item)[0];
			const val = item[key];

			if (val !== null && val !== 0) {
				const wowheadRes = await get(
					'https://classic.wowhead.com/?item=' + val + '&xml'
				);

				const data = await parser.parseStringPromise(wowheadRes.data);

				charData.items[key.replace(/Slot/, '').toLowerCase()] =
					data.wowhead.item[0];
			} else {
				charData.items[key.replace(/Slot/, '').toLowerCase()] = null;
			}
		}

		const newCharacter = new Character({
			name: charData.name,
			realm: charData.realm,
			data: JSON.stringify(charData)
		});

		const savedCharacter = await newCharacter.save();

		const session = getSession(event.headers);

		// update session
		getSession(event.headers, {
			uploads: [
				...session.data.uploads,
				{
					_id: savedCharacter._id,
					name: savedCharacter.name,
					realm: savedCharacter.realm,
					time: savedCharacter.time
				}
			]
		});

		return {
			statusCode: 200,
			body: JSON.stringify({ success: true, url: savedCharacter._id })
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 200,
			body: JSON.stringify({ error: err.message })
		};
	}
};
