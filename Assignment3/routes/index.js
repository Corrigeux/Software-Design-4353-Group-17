const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')

router = express.Router()

const {ensureAuthenticated} = require('../config/auth')

router.get("/", (req,res) => {
	res.render('login')
})


router.get('/profile', ensureAuthenticated, (req,res) => {
	res.render('profile')
})

router.post('/api/saveprofile', (req,res) => {

	let name = req.body.name
	let address = req.body.address
	let address2 = req.body.address2
	let city = req.body.city
	let state = req.body.state
	let zipcode = req.body.zipcode


	let errors = []
	if(name.length > 50 || address.length > 100 || address2.length > 100 || city.length > 100 || zipcode < 5 ){
	errors.push({msg: 'Invalid Info, please check the lengths of the information inputted'})
	// Making validation, if information is missing we show the user to input values again
	let clientinfo = {name: name, address: address, address2: address2, city: city, state: state, zipcode: zipcode}
		
	}else{
		res.render('profile', errors)
	}


	User.findOneAndUpdate({email: req.user.email}, {info: clientinfo}, (err,doc) => {
			console.log("Updated Document")
		})

	res.render('newquote')
})


router.post("/pricing/save",ensureAuthenticated, (req,res) => {
	// This is the route for doing each quote calculation
	// We will recieve data form the newquote module 
})

router.get("/quote", ensureAuthenticated, (req,res) => {

// Here we will pull data from Database to display, this assignment we are not using DB so
// We are hardcoding the data onto the front end
	// User.find({}, (err, result) => {
	// 	    if (err) {
	// 	      console.log(err);
	// 	    } else {
	//			let data = result
	// 	     res.render('fuelhistory', {fuel: data})
	// 	    }
	// 	  });

	res.render('fuelhistory')
})

module.exports = router