const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		required: false,
	},
	email: {
		type: String,
	},
	document: {
		type: String,
	},
	whatsapp: {
		type: String,
	},
	telegram: {
		type: Date
	},
	sms: {
		type: Date
	},
	phone: {
		type: Date
	},
	level: {
		type: Number
	},
	address: {
		country: {
			type: String,
		},
		zip_code: {
			type: String,
		},
		city: {
			type: String,
		},
		district: {
			type: String
		},
		address: {
			type: String,
		},
		number: {
			type: String
		},
		complement: {
			type: String
		},
		reference: {
			type: String
		},
		lat: {
			type: String
		},
		long: {
			type: String
		}

	}
});
module.exports = contact = mongoose.model('contact', contactSchema);
