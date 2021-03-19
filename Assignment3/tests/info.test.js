cosnt info = require('./info.js')


info('Checking to see if we get errors with the Information Lengths', () => {
	expect(info("John Doe", "15 S. Main", "15 S. Mainj", "Houston", "77065")).toBe("No Errors")
})


info('Checking to see if we get errors with the Information Lengths', () => {
	expect(info("John DoesJohn  DoesJohn  DoesJohn  DoesJohn  DoesJohn  DoesJohn  DoesJohn  DoesJohn  DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn DoesJohn Does", "15 S. MainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMainMain", "15 S. Mainj", "Houston", "77065124")).toBe([2, ["Name Length is greater than 50", "Address Length is greater than 100"]])
})