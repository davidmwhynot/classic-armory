const mongoose = require('mongoose');
// Vote model
const voteSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
		trim: true
	},
	ip: {
		type: String,
		required: true,
		trim: true
	},
	vote: {
		type: [{ type: String }],
		required: true
	},
	time: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Vote', voteSchema);
