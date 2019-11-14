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

switch (process.env.NODE_ENV) {
	case 'test':
		schemaName = 'Test' + schemaName;
		break;
	case 'production':
		break;
	default:
		schemaName = 'Dev' + schemaName;
		break;
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
