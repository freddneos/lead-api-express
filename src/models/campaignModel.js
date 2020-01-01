const mongoose = require('mongoose');
const campaignSchema = new mongoose.Schema({
	highlight: [{
		product: {type: mongoose.Schema.ObjectId, ref: 'product'},
		price:String
	}],
	recomended: [{
		product: {type: mongoose.Schema.ObjectId, ref: 'product'},
		price:String
	}],
	contacts:  [{
		type: mongoose.Schema.ObjectId, ref: 'contact'
	}],
	startDate: {
		type: Date,
	},
	endDate: {
		type: Date
	},
	sms: {
		type: Boolean
	},
	email: {
		type: Boolean
	},
	whatsapp: {
		type: Boolean
	},
	cost:{
		type:String
	},
	enabled:{
		type:Boolean
	},
	description:{
		type:String
	},
	name:{
		type:String,
		required:true
	}
});
module.exports = campaign = mongoose.model('campaign', campaignSchema);
