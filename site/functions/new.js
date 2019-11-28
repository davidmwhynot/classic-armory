// initial import
const { get } = require('axios');
const mongoose = require('mongoose');

const sentry = require('./utils/sentry');
const enchants = require('./utils/enchants.json');

let getSession,
	logo,
	Character,
	AppState,
	wowheadGetEquippedItem,
	wowheadGetBagItem,
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

	// get wowhead data
	wowheadGetEquippedItem = item => {
		return new Promise(async resolve => {
			if (item.item) {
				const res = await get(
					'https://classic.wowhead.com/tooltip/item/' + item.item
				);

				const itemData = {
					index: item.index,
					id: item.item,
					slot: item.slot,
					data: res.data
				};

				if (item.enchant) {
					const enchant = enchants.find(
						enchant => enchant.id === item.enchant
					);
					itemData.enchant = enchant.enchant;
				}

				resolve(itemData);
			} else {
				resolve({
					index: item.index,
					slot: item.slot
				});
			}
		});
	};

	wowheadGetBagItem = item => {
		return new Promise(async resolve => {
			const res = await get(
				'https://classic.wowhead.com/tooltip/item/' + item.item
			);

			const itemData = {
				id: item.item,
				slot: item.slot,
				count: item.count,
				data: res.data
			};

			if (item.enchant) {
				const enchant = enchants.find(
					enchant => enchant.id === item.enchant
				);
				itemData.enchant = enchant.enchant;
			}

			resolve(itemData);
		});
	};
} catch (err) {
	console.error(err);

	sentry(err);

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

		const version = req.v || '0.1.0';

		const session = await getSession(event.headers);

		let newCharacter;
		let charData;

		console.time('parse upload');

		switch (version) {
			case undefined:
			case '0.0.1':
			case '0.1.0':
				charData = {
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

						charData.items[
							key.replace(/Slot/, '').toLowerCase()
						] = {
							id: val,
							...res.data
						};
					} else {
						charData.items[
							key.replace(/Slot/, '').toLowerCase()
						] = null;
					}
				}

				newCharacter = new Character({
					session: session._id,
					version: 'v0.1.0',
					name: charData.name,
					realm: charData.realm,
					data: JSON.stringify(charData)
				});

				break;
			case '1.0.2':
				charData = {
					type: req.type,
					region: req.region,
					name: req.name,
					realm: req.realm,
					guild: req.guild,
					race: req.race,
					sex: req.sex,
					level: req.level,
					class: req.class,
					money: req.money,
					xp: req.xp,
					stats: req.stats,
					talents: req.talents,
					skills: req.skills,
					reps: req.reps,
					pvp: req.pvp,
					buffs: [],
					debuffs: [],
					items: {
						bags: [],
						equipped: [],
						bank: []
					}
				};

				// buffs
				for (const buff of req.buffs) {
					const res = await get(
						'https://classic.wowhead.com/tooltip/spell/' + buff
					);

					charData.buffs.push({ ...res.data, id: buff });
				}

				// debuffs
				for (const debuff of req.debuffs) {
					const res = await get(
						'https://classic.wowhead.com/tooltip/spell/' + debuff
					);

					charData.debuffs.push({ ...res.data, id: debuff });
				}

				//? XXX ITEMS XXX ?
				// equipped items
				let equippedItemPromises = [];
				let equippedItemIndex = 0;
				for (const item of req.items.equipped) {
					item.index = ++equippedItemIndex;

					equippedItemPromises.push(wowheadGetEquippedItem(item));
				}

				const equippedItemData = (
					await Promise.all(equippedItemPromises)
				).sort((a, b) => a.index > b.index);

				for (const item of equippedItemData) {
					charData.items.equipped.push(item);
				}

				// charData.items.equipped = charData.items.equipped;

				// bag items
				for (const bag of req.items.bags) {
					if (bag.item) {
						const res = await get(
							'https://classic.wowhead.com/tooltip/item/' +
								bag.item
						);

						const bagData = {
							id: bag.item,
							slot: bag.slot,
							data: res.data,
							items: []
						};

						const bagItemPromises = [];

						for (const item of bag.items) {
							if (item.item) {
								bagItemPromises.push(wowheadGetBagItem(item));
							}
						}

						const bagItemData = await Promise.all(bagItemPromises);

						for (const item of bagItemData) {
							bagData.items.push(item);
						}

						charData.items.bags.push(bagData);
					} else if (bag.slot === 'BackpackSlot') {
						const bagData = {
							slot: bag.slot,
							items: []
						};

						const backpackItemPromises = [];

						for (const item of bag.items) {
							if (item.item) {
								backpackItemPromises.push(
									wowheadGetBagItem(item)
								);
							}
						}

						const backpackItemData = await Promise.all(
							backpackItemPromises
						);

						for (const item of backpackItemData) {
							bagData.items.push(item);
						}

						charData.items.bags.push(bagData);
					} else {
						charData.items.bags.push({
							slot: bag.slot
						});
					}
				}

				// bank items
				for (const bag of req.items.bank) {
					if (bag.item) {
						const res = await get(
							'https://classic.wowhead.com/tooltip/item/' +
								bag.item
						);

						const bagData = {
							id: bag.item,
							slot: bag.slot,
							data: res.data,
							items: []
						};

						const bankItemPromises = [];

						for (const item of bag.items) {
							if (item.item) {
								bankItemPromises.push(wowheadGetBagItem(item));
							}
						}

						const bankItemData = await Promise.all(
							bankItemPromises
						);

						for (const item of bankItemData) {
							bagData.items.push(item);
						}

						charData.items.bank.push(bagData);
					} else if (bag.id === -1) {
						const bagData = {
							slot: -1,
							items: []
						};

						const bankItemPromises = [];

						for (const item of bag.items) {
							if (item.item) {
								bankItemPromises.push(wowheadGetBagItem(item));
							}
						}

						const bankItemData = await Promise.all(
							bankItemPromises
						);

						for (const item of bankItemData) {
							bagData.items.push(item);
						}

						charData.items.bank.push(bagData);
					} else {
						charData.items.bank.push({
							slot: bag.slot
						});
					}
				}

				newCharacter = new Character({
					session: session._id,
					version: 'v1.0.2',
					name: charData.name,
					realm: charData.realm,
					region: charData.region,
					type: charData.type,
					data: JSON.stringify(charData)
				});

				break;
			default:
				throw new Error('Invalid character sheet version. ');
				break;
		}

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

		// logo(appState);

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

		// logo(newAppState);

		console.timeEnd('parse upload');

		return {
			// TODO: set session cookie
			statusCode: 200,
			body: JSON.stringify({ success: true, url: savedCharacter._id })
		};
	} catch (err) {
		console.error(err);

		sentry(err);

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
