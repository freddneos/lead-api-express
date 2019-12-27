const mongoose = require('mongoose');
const userSchema   = new mongoose.Schema({
	name:{
		type:String,
		required:false,
	},
	email:{
		type:String,
		required:true,
	},
	password:{
		type:String,
		required:true,
	},
	date:{
		type:Date
	}
});
module.exports = User = mongoose.model('user', userSchema);
