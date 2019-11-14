// import
const mongoose = require('mongoose');
const { get, post } = require('axios');

const {
	characters: [{ raw: DavesbankRaw }]
} = require('../../test-data.json');

const cleanupCollections = require('./utils/cleanupCollections');

const Character = require('../functions/models/CharacterModel');
const AppState = require('../functions/models/AppStateModel');
const Session = require('../functions/models/AppStateModel');

// config
const CONFIG = {};
const uri = `mongodb+srv://${process.env.CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;

// connect
mongoose.connect(uri, { useNewUrlParser: true });
console.log('here3');

// beforeAll(() => {
// 	return new Promise(async resolve => {
// 		CONFIG.Davesbank = await Character();
// 		CONFIG.appState = new AppState();
// 	})
// });

test('it returns app state with one character upload', async () => {
	console.log('here0');
	const newRes = await post(
		'http://localhost:3000/.netlify/functions/new',
		DavesbankRaw
	);

	if (newRes.ok) {
		const {
			data: { url: _id }
		} = newRes;

		const Davesbank = await Character.findOne({ _id });

		const { data: res } = await get(
			'http://localhost:3000/.netlify/functions/app-state'
		);

		expect(res.success).toBe(true);
		expect(res.global.uploads).toBe([
			{
				_id,
				name: 'Davesbank',
				realm: 'Herod',
				time: Davesbank.time
			}
		]);
	} else {
		throw Error(newRes.statusText);
	}
}, 10000);

// afterEach(async () => {
// 	console.log('here');
// 	await cleanupCollections();
// }, 10000);

afterAll(async () => {
	console.log('here2');
	// await cleanupCollections();
	mongoose.disconnect();
}, 10000);
