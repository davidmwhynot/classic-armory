const AppState = require('../../functions/models/AppStateModel');
const Session = require('../../functions/models/SessionModel');
const Character = require('../../functions/models/CharacterModel');

module.exports = () => {
	return new Promise(async resolve => {
		const collections = [AppState.find(), Session.find(), Character.find()];

		for (collection of collections) {
			for (document of collection) {
				await document.delete();
			}
		}

		resolve();
	});
};
