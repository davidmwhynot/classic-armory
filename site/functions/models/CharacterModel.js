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
