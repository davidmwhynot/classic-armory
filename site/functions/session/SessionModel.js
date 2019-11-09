const mongoose = require('mongoose');

// Character model
const sessionSchema = mongoose.Schema({
	data: {
		type: Object,
		required: true
	},
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

let schemaName = '';
if (process.env.NODE_ENV === 'production') {
	shcemaName = 'Session';
} else {
	schemaName = 'TestSession';
}
module.exports = mongoose.model(schemaName, sessionSchema);
