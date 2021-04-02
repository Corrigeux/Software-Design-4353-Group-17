module.exports = {
	ensureAuthenticated: function(req, res, next) {
		if(req.isAuthenticated()){
			return next()
		}
		console.log("Please login to view this resource")
		res.redirect('/users/login')
	}
}