const shortid = require('shortid');
const mongoose = require('mongoose');

// Character model
const schema = mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate
	},
	session: {
		type: String,
		required: true
	},
	version: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	realm: {
		type: String,
		required: true,
		trim: true
	},
	data: {
		type: String,
		required: true
	},
	time: { type: Date, default: Date.now }
});

let schemaName = 'Character';

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
