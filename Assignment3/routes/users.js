const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

router = express.Router()

router.get('/', (req,res) => {
	res.render('login')
})

router.get('/login', (req, res) => {
	res.render('login')
})

router.get('/register', (req,res) => {
	res.render('register')
})

router.post('/register', (req,res) => {
	console.log(req.body)
	const {name, email, password, password2} = req.body

	let errors = []	
	if(!name || !email || !password || !password2){
		errors.push({msg: "Please submit all feilds"})
	}

	if(password !== password2){
		errors.push({msg: 'Passwords do not match!'})
	}

	if(password.length < 6){
		errors.push({msg: 'Password lengths should be longer'})
	}

	if(errors.length > 0){
		res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		})
	}else{

	User.findOne({email: email})
	.then(user => {
		if(user){
			errors.push({msg: 'Email is already registered'})
			console.log("Email already used")

			res.render('register', {
			errors,
			name,
			email,
			password,
			password2
			})


		}else{
			const newUser = new User({
				name: name,
				email: email,
				password: password
			})

			// console.log(newUser)


			bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if(err) throw err;

							// Set password to hashed
							newUser.password = hash

							newUser.save()
							.then(user => {
								console.log(`User ${name} Registered`)
								res.redirect('/users/login')
							})
							.catch(err => console.log("Error +" + err))
						})
					})
		}
	})

}
})


router.post('/login', (req,res, next) => {
	passport.authenticate('local', {
		successRedirect: '/profile',
		failureRedirect: '/users/login',
	})(req, res, next)
})

// Logout
router.get('/logout', (req,res) => {
	req.logout()
	res.redirect('/users/login')
})

module.exports = router