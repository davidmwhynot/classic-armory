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
