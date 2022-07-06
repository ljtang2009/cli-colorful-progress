const logUpdate = require('log-update')
const chalk = require('chalk')
const Gradient = require('javascript-color-gradient')
const supportsColor = require('supports-color')
const mathTools = require('./mathTools')

const regHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i

module.exports = class {
  #gradientArray
  #options

  constructor(options) {
    if (process.stdout.isTTY) {
      this.#options = {
        minimum: 0,
        maximum: 100,
        current: 0,
        width: Math.floor(mathTools.divide(process.stdout.columns, 4)),
        colors: ['#f44336', '#ffeb3b'],
        backgroundColor: undefined,
        leftString: undefined,
        rightString: undefined,
        autoDisappear: false,
        ...options,
      }
      logUpdate.done()
      this.#render()
    }
  }

  #checkConstructorParameters() {
    let result = true
    let errorMessage
    /* #region minimum maximum current */
    if (result && typeof this.#options.minimum !== 'number') {
      errorMessage = 'Minimum must be a number.'
      result = false
    }
    if (result && typeof this.#options.maximum !== 'number') {
      errorMessage = 'Maximum must be a number.'
      result = false
    }
    if (result && this.#options.minimum >= this.#options.maximum) {
      errorMessage = 'Maximum must be > minimum.'
      result = false
    }
    if (result && typeof this.#options.current !== 'number') {
      errorMessage = 'Current must be a number.'
      result = false
    }
    if (result && this.#options.current > this.#options.maximum) {
      errorMessage = 'Maximum must be >= current.'
      result = false
    }
    if (result && this.#options.minimum > this.#options.current) {
      errorMessage = 'Current must be >= minimum.'
      result = false
    }
    /* #endregion */
    /* #region width */
    if (result && typeof this.#options.width !== 'number') {
      errorMessage = 'Width must be a number.'
      result = false
    }
    if (result && this.#options.width <= 0) {
      errorMessage = 'Width must be > 0.'
      result = false
    }
    if (result && Math.floor(this.#options.width) !== this.#options.width) {
      errorMessage = 'Width must be an integer.'
      result = false
    }
    /* #endregion */
    /* #region colors */
    if (result) {
      if (
        typeof this.#options.colors === 'undefined' ||
        !Array.isArray(this.#options.colors)
      ) {
        errorMessage = 'Colors must be an array.'
        result = false
      }
      if (result && this.#options.colors.length < 2) {
        errorMessage = "Colors'length must be larger than 1."
        result = false
      }
      for (const color of this.#options.colors) {
        if (!regHex.test(color)) {
          errorMessage = "Color must be a hex such as '#FF0000'."
          result = false
          break
        }
      }
    }
    /* #endregion */
    /* #region backgroundColor */
    if (
      result &&
      typeof this.#options.backgroundColor !== 'undefined' &&
      !regHex.test(this.#options.backgroundColor)
    ) {
      errorMessage = "BackgroundColor must be a hex such as '#FF0000'."
      result = false
    }
    /* #endregion */
    /* #region leftString rightString*/
    if (
      result &&
      ['string', 'undefined'].indexOf(typeof this.#options.leftString) === -1
    ) {
      errorMessage = "'leftString' must be a string."
      result = false
    }
    if (
      result &&
      ['string', 'undefined'].indexOf(typeof this.#options.rightString) === -1
    ) {
      errorMessage = "'rightString' must be a string."
      result = false
    }
    /* #endregion */
    if (typeof errorMessage !== 'undefined') {
      throw new Error(errorMessage)
    }
    return result
  }

  #render() {
    if (this.#checkConstructorParameters()) {
      if (supportsColor.stdout) {
        this.#gradientArray = new Gradient()
          .setColorGradient(...this.#options.colors)
          .setMidpoint(this.#options.width)
          .getColors()
      }
      let isDone = false
      let progressString = ''
      for (let i = 0; i < this.#options.width; i++) {
        let isEmpty =
          mathTools.multiply(
            mathTools.subtract(this.#options.current, this.#options.minimum) /
              mathTools.subtract(this.#options.maximum, this.#options.minimum),
            this.#options.width
          ) <
          i + 1
        if (!isEmpty && i === this.#options.width - 1) {
          isDone = true
        }
        let progressChar = ' '
        if (supportsColor.stdout) {
          if (isEmpty) {
            if (typeof this.#options.backgroundColor !== 'undefined') {
              progressChar = chalk.bgHex(this.#options.backgroundColor)(
                progressChar
              )
            }
          } else {
            progressChar = chalk.bgHex(this.#gradientArray[i])(progressChar)
          }
          progressString += progressChar
        } else {
          progressString += isEmpty ? progressChar : '='
        }
      }
      if (typeof this.#options.leftString === 'string') {
        progressString = this.#options.leftString + progressString
      }
      if (typeof this.#options.rightString === 'string') {
        progressString = progressString + this.#options.rightString
      }
      logUpdate(progressString)
      if (isDone && this.#options.autoDisappear) {
        logUpdate.clear()
      }
    }
  }

  setProgress(val) {
    if (val) {
      for (const key in val) {
        if (typeof val[key] !== 'undefined') {
          this.#options[key] = val[key]
        }
      }
    }

    this.#render()
  }
}
