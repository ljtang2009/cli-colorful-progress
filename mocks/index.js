const ColorfulProgress = require('../')
const mathTools = require('../lib/mathTools')

const minimum = 0
const maximum = 1

const bar = new ColorfulProgress({
  backgroundColor: '#eee',
  minimum,
  maximum,
  current: minimum,
  colors: ['#9c27b0', '#2196f3', '#b2ebf2'],
  // autoDisappear: true,
  width: 20,
  leftString: 'ready',
  rightString: 'show message',
})

let val = 0
const step = 0.01
const intervalId = setInterval(function () {
  bar.setProgress({
    current: val,
    leftString: Math.floor(mathTools.divide(val, maximum) * 100) + '% ',
    rightString:
      ' ' +
      (val > mathTools.divide(maximum, 2)
        ? val === maximum
          ? 'done'
          : 'almost done'
        : 'begin'),
  })
  val = mathTools.add(val, step)
  if (val > maximum) {
    clearInterval(intervalId)
    console.log('done')
  }
}, 10)
