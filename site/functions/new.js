// initial import
const { get } = require('axios');
const mongoose = require('mongoose');

let getSession,
	logo,
	Character,
	AppState,
	setupError = false;
try {
	// local import
	const utils = require('./utils');

	getSession = utils.getSession;
	logo = utils.logo;

	Character = require('./models/CharacterModel');
	AppState = require('./models/AppStateModel');

	// config
	const uri = `mongodb+srv://${process.env.CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;

	// connect
	mongoose.connect(uri, { useNewUrlParser: true });
} catch (err) {
	console.error(err);

	setupError = err;
}

// request handler
exports.handler = async function(event, context) {
	if (setupError) {
		return {
			statusCode: 200,
			body: JSON.stringify({
				success: false,
				error: setupError.message,
				stack: setupError.stack
			})
		};
	}

	try {
		const req = JSON.parse(event.body);

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
				const res = await get(
					'https://classic.wowhead.com/tooltip/item/' + val
				);

				// const data = await parser.parseStringPromise(wowheadRes.data);

				charData.items[key.replace(/Slot/, '').toLowerCase()] = {
					id: val,
					...res.data
				};
			} else {
				charData.items[key.replace(/Slot/, '').toLowerCase()] = null;
			}
		}

		const session = await getSession(event.headers);

		const newCharacter = new Character({
			session: session._id,
			version: 'v0.0.1',
			name: charData.name,
			realm: charData.realm,
			data: JSON.stringify(charData)
		});

		const savedCharacter = await newCharacter.save();

		let uploads = session.data.uploads || [];
		if (uploads.length > 4) {
			uploads.shift();
		}

		uploads.push({
			_id: savedCharacter._id,
			name: savedCharacter.name,
			realm: savedCharacter.realm,
			time: savedCharacter.time
		});

		// update session
		const newSession = await getSession(event.headers, { uploads });

		// update AppState
		const appState =
			(await AppState.find())[0] ||
			new AppState({
				uploads: [],
				updated: Date.now()
			});

		logo(appState);

		let globalUploads = appState.uploads || [];
		if (globalUploads.length > 4) {
			globalUploads.shift();
		}

		globalUploads.push({
			_id: savedCharacter._id,
			name: savedCharacter.name,
			realm: savedCharacter.realm,
			time: savedCharacter.time
		});

		appState.uploads = globalUploads;
		appState.updated = Date.now();
		const newAppState = await appState.save();

		logo(newAppState);

		return {
			// TODO: set session cookie
			statusCode: 200,
			body: JSON.stringify({ success: true, url: savedCharacter._id })
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
