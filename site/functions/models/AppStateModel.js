const mongoose = require('mongoose');

// Character model
const sessionSchema = mongoose.Schema({
	uploads: {
		type: Array,
		required: true,
		default: []
	},
	updated: { type: Date, default: Date.now }
});

let schemaName = '';
if (process.env.NODE_ENV === 'production') {
	shcemaName = 'AppState';
} else {
	schemaName = 'TestAppState';
}
module.exports = mongoose.model(schemaName, sessionSchema);
