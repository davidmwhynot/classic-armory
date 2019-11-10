const mongoose = require('mongoose');

// Session model
const schema = mongoose.Schema({
	data: {
		type: Object,
		required: true
	},
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

let schemaName = 'Session';

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
