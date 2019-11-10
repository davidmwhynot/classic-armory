// import
const mongoose = require('mongoose');

const AppState = require('./models/AppStateModel');

// config
const uri = `mongodb+srv://${process.env.CLASSICARMORY_DB_LOGIN}.mongodb.net/test?retryWrites=true&w=majority`;

// connect
mongoose.connect(uri, { useNewUrlParser: true });

// request handler
exports.handler = async function(event, context) {
	try {
		const appState = await AppState.findOne();

		// console.log(appState);

		return {
			statusCode: 200,
			body: JSON.stringify({
				success: true,
				global: { uploads: appState.uploads }
			})
		};
	} catch (err) {
		console.error(err);

		return {
			statusCode: 200,
			body: JSON.stringify({ error: err.message })
		};
	}
};
