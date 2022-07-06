const math = require('mathjs')

const add = (num1, num2) => {
  return Number(
    math.format(math.add(math.bignumber(num1), math.bignumber(num2)))
  )
}

const subtract = (num1, num2) => {
  return Number(
    math.format(math.subtract(math.bignumber(num1), math.bignumber(num2)))
  )
}

const multiply = (num1, num2) => {
  return Number(
    math.format(math.multiply(math.bignumber(num1), math.bignumber(num2)))
  )
}

const divide = (num1, num2) => {
  return Number(
    math.format(math.divide(math.bignumber(num1), math.bignumber(num2)))
  )
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
}
