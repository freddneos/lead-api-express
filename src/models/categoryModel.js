const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

categorySchema.plugin(mongoosePaginate);

module.exports = Category = mongoose.model('category', categorySchema);
