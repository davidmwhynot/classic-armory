const mongoose = require('mongoose');

// AppState model
const schema = mongoose.Schema({
	uploads: {
		type: Array,
		required: true,
		default: []
	},
	updated: { type: Date, default: Date.now }
});

let schemaName = 'AppState';

if (process.env.NODE_ENV !== 'production') {
	schemaName = 'Test' + schemaName;
}

if (!modelAreadyDeclared(schemaName)) {
	module.exports = mongoose.model(schemaName, schema);
} else {
	module.exports = mongoose.model(schemaName);
}

function modelAreadyDeclared(schemaName) {
	try {
		mongoose.model(schemaName);
		return true;
	} catch (e) {
		return false;
	}
}
