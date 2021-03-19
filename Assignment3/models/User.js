const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	info: {type: Object, require: true}
	fuel: {type: Array, default: [{Gallons: 0, Delivery: "N/A", DeliveryDate: "N/A", SuggestedDate:"N/A", TotalAmount:0}]}
})

const User = mongoose.model('User', UserSchema)


module.exports = User