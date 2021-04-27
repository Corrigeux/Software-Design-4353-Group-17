const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {type: String},
	email: {type: String},
	username: {type: String},
	password: {type: String},
	userdetails: {type: Array},
	fuelquotes: {type: Array}
})

const User = mongoose.model('User', UserSchema)


module.exports = User