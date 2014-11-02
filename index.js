var Stream = require('stream')
var inherits = require('util').inherits

var xtend = require('xtend')

module.exports = Fifo

var elements = []

function Fifo(initial_elements, options) {
  if(!Array.isArray(initial_elements)) {
    throw new Error('Initial queue is not an array')
  }

  options = xtend({end: true}, options)

  Stream.call(this)

  this.end_when_empty = options.end
  this.readable = true
  this.paused = true

  elements = initial_elements || elements.concat(initial_elements)

  setImmediate(stream_elements.bind(null, this))
}

inherits(Fifo, Stream.prototype)

Fifo.prototype.pause = function() {
  this.paused = true
}

Fifo.prototype.resume = function() {
  this.paused = false

  if(this.elements.length) {
    stream_elements()

    return
  }

  if(this.end_when_wempty) {
    this.emit('end')
  }
}

Fifo.prototype.queue = function(new_els) {
  elements.push.apply(elements, new_els)
}

function stream_elements(stream) {
  if(stream.paused || !elements.length) {
    return false
  }

  stream.emit('data', elements.shift())

  // wait a tick, so we can pause if necessary, and then fire again.
  setImmediate(stream_elements.bind(null, stream))
}
