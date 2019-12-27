const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: false,
	},
	description: {
		type: String,
	},
	ean13: {
		type: String,
	},
	image: {
		type: String
	},
	blackstripe: {
		type: Boolean
	},
	category: { type: Schema.ObjectId, ref: 'category' },
	date: {
		type: Date
	}
});
module.exports = Product = mongoose.model('product', productSchema);
