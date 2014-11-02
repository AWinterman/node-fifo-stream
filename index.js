var through = require('through')
var inherits = require('util').inherits

var xtend = require('xtend')

module.exports = makeFifo

var elements = []

function makeFifo(initial_elements, options) {
  var stream = through(write)

  options = xtend({ends: true}, options)

  stream.write(initial_elements)

  return stream

  function write(new_els) {
    elements.push.apply(elements, new_els)

    if(elements.length) {
      setImmediate(emit)
    }
  }

  function emit() {
    if(stream.paused || stream.ended) {
      return
    }

    var next = elements.shift()

    stream.queue(next)

    if(elements.length) {
      setImmediate(emit)
    } else if(options.ends) {
      stream.end()
    }
  }
}
