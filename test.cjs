const matchare = require('./matchare.cjs')

const actual = { a: 1 }
const expected = { a: 1, b: 2 }

console.log(matchare(actual, expected)) // false
