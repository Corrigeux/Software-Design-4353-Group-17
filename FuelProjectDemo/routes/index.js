const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')

router = express.Router()

const {ensureAuthenticated} = require('../config/auth')

router.get("/", (req,res) => {
	res.render('login')
})

router.get('/profile', ensureAuthenticated, (req,res) => {
	// console.log(req.user)
	if(req.user.userdetails.length > 0){
		res.render('profile', {message: "You have already submitted user info, you can update them here if you like."})
	}else{
		res.render('profile', {message: "Please Enter your information to be saved."})
	}
})

router.post('/saveprofile',ensureAuthenticated,  (req,res) => {
	console.log(req.body)
	// console.log(req.user)

	const {name, address, address2, city, zipcode, state} = req.body

	let logs = []
	// Doing the back-end Validation for Client Information
	if(!name || !address || !city || !zipcode || !state){
		logs.push({msg: "Please enter all the feilds"})
	}

	if(name.length > 50 && typeof name == String){
		logs.push({msg: "Name has to be less than 50 Characters"})
	}

	if(address.length > 100 && typeof address == String){
		logs.push({msg: "Address 1 length has to be less than 100 characters"})
	}

	if(address2.length > 100 && typeof address2 == String){
		logs.push({msg: "Address 2 length has to be less than 100 characetrs"})
	}

	if(city.length > 100 && typeof city == String){
		logs.push({msg: "City length has to be less than 100 characetrs"})
	}

	if(zipcode.length < 5 && typeof zipcode == Number){
		logs.push({msg: "Zipcode has to be greater than 5 characetrs"})
	}else if(zipcode.length > 9 && typeof zipcode == Number){
		logs.push({msg: "Zipcode has to be less than 9 characters"})
	}

	let userinfo = {
		fullname: name,
		address: address,
		address2: address2,
		city: city,
		zipcode: zipcode,
		state: state
	}

	let errors = [...logs]

	let data = []
	data.push(userinfo)

	let email = req.user.email
	
	if(errors.length > 0){
		res.render('profile', {errors})
	}else{

		User.findOneAndUpdate({email: email}, {userdetails: data}, (err,doc) => {
			console.log("Updated Document")
		})

		res.redirect("/myprofile")

	}

})

router.get("/myprofile", ensureAuthenticated, (req, res) => {
	console.log(req.user)

	if(req.user.userdetails.length > 0){
	const {fullname, address, address2, city, zipcode, state} = req.user.userdetails[0]

	let userprofile = {
		name: fullname,
		address: address,
		address2: address2,
		city: city,
		zipcode: zipcode,
		state: state
	}

	res.render("myprofile", {data: userprofile})
	}else{
		res.render("myprofile")
	}


})

router.get("/quote", ensureAuthenticated, (req, res) => {
	let address = req.user.userdetails[0].address
	let state = req.user.userdetails[0].state
	let quote = req.user.fuelquotes.length
	res.render("newquote", {address: address, quote: quote, state: state })
})


router.post("/savequote", ensureAuthenticated, (req,res) => {
	let email = req.user.email
	const {gallons, address, delivery, price, total} = req.body

	let fuel = req.user.fuelquotes 

	let newquote = {
		gallons: gallons,
		address: address,
		delivery: delivery,
		price: price,
		total: total
	}

	fuel.push(newquote)

	// console.log(email)
	// console.log(fuel)

	User.findOneAndUpdate({email: email}, {fuelquotes: fuel}, (err,doc) => {
			console.log("Updated Document")
		})
	res.redirect('/fuelhistory')
})

router.get("/fuelhistory", ensureAuthenticated, (req,res) => {

	let quotes = req.user.fuelquotes
	console.log(quotes)
	let delivery = req.user.userdetails[0].address

	res.render("fuelhistory", {quotes, deliver: delivery})

})


module.exports = router