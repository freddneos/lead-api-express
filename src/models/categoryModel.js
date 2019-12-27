const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: false,
	},
	description: {
		type: String,
	},
	date: {
		type: Date
	}
});
module.exports = Category = mongoose.model('category', categorySchema);
