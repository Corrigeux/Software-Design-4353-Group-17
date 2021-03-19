let checkinfo = (name, address, address2, city,zipcode) => {
	// State is always 2 characters because of dropdown
	let errors = []
	if(name.length > 50){
		errors.push("Name Length is greater than 50")
	}
	if(address.length > 100){
		errors.push("Address Length is greater than 100")
	}
	if(city.length > 100){
		errors.push("City Length is greater than 100")
	}
	if(zipcode.length < 5 || zipcode.length > 9){
		errors.push("Zipcode Length is greater than 9 or less than 5")
	}
	let t = [errors.length, ...errors]
	if(errors.length > 1){
		return t
	}else{
		return "No Errors"
	}
}

module.exports = checkinfo