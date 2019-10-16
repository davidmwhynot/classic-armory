// for (const envVar of process.env) {
// 	console.log(envVar);
// }
// import
const mongoose = require('mongoose');

const { get } = require('axios');
const { Parser } = require('xml2js');

const Character = require('./CharacterModel');

// config
const Schema = mongoose.Schema;
const uri = `mongodb+srv://${process.env.CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;
console.log('uri', uri);

// connect
mongoose.connect(uri, { useNewUrlParser: true });

// request handler
exports.handler = async function(event, context) {
	try {
		console.log('proces.env.NODE_ENV', process.env.NODE_ENV);

		// const req = event.body;
		const req = JSON.parse(event.body);
		// console.log('req');
		// console.log(req);

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
			// console.log('item', item);

			const key = Object.keys(item)[0];
			const val = item[key];

			// console.log(key, val);

			if (val !== null && val !== 0) {
				const wowheadRes = await get(
					'https://classic.wowhead.com/item=' + val + '&xml'
				);

				// console.log(wowheadRes.data);

				const data = await parser.parseStringPromise(wowheadRes.data);

				// console.log(data.wowhead.item);

				charData.items[key.replace(/Slot/, '').toLowerCase()] =
					data.wowhead.item[0];
			} else {
				charData.items[key.replace(/Slot/, '').toLowerCase()] = null;
			}
		}

		// console.log('charData', charData);

		const newCharacter = new Character({
			name: charData.name,
			realm: charData.realm,
			data: JSON.stringify(charData)
		});

		const savedCharacter = await newCharacter.save();

		// console.log('savedCharacter', savedCharacter);

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
