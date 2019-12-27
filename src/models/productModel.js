const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	ean13: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: ''
	},
	blackstripe: {
		type: Boolean,
		default: false
	},
	category: { type: mongoose.Schema.ObjectId, ref: 'category' },
	createdAt: {
		type: Date,
		default: Date.now(),
	}
});
module.exports = Product = mongoose.model('product', productSchema);
