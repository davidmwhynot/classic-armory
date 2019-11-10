const shortid = require('shortid');
const mongoose = require('mongoose');

// Character model
const characterSchema = mongoose.Schema({
	_id: {
		type: String,
		default: shortid.generate
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

module.exports = mongoose.model('Character', characterSchema);