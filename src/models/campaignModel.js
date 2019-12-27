var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'id' : Number,
	'name' : String,
	'email' : String,
	'password' : String,
	'active' : Boolean
});

module.exports = mongoose.model('user', userSchema);
