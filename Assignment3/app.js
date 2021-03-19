const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

require('./config/passport')(passport)

const db = require('./config/keys').MongoURI
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log("Error: " + err))

const app = express()

app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false}))

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Authentication
app.use(passport.initialize());
app.use(passport.session());


PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log("Server started")
})

// CSS
app.use('/', express.static('views'))

app.use('/users/login', express.static('views'))
app.use('/users/register', express.static('views'))
app.use('/users/profile', express.static('views'))
app.use('/users/price', express.static('views'))
app.use('/users/fuelhistory', express.static('views'))

app.use('/', require('./routes/index'))

app.use('/users', require('./routes/users'))