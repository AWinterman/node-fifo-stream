var Fifo = require('./index')
var Stream = require('stream')
var tape = require('tape')

tape('emits data', function(t) {
  var fifo = new Fifo([1,2,3])

  var expected = [1,2,3]
  var index = 0

  fifo.on('data', function(data) {
    t.equal(data, expected[index])
    index++
  })

  fifo.on('end', function() {
    t.equal(index, 3)
    t.end()
  })

  fifo.resume()
})

tape('pauses', function(t) {
  t.plan(4)
  var fifo = new Fifo()

  var expected = [1,2,3]
  var index = 0

  fifo.once('data', function(data) {
    fifo.pause()

    t.equal(data, expected[index])
    t.equal(fifo.paused, true)

    fifo.write([2,3])

    fifo.on('data', function(data) {
      t.equal(data, expected[index])
      index++
    })

    index++
    fifo.resume()
  })

  fifo.on('end', t.end.bind(t))
  fifo.write([1])

  fifo.resume()
})

tape('queues', function(t) {
  var fifo = new Fifo([1,2,3])

  var expected = [1,2,3,4,5]
  var index = 0

  fifo.once('data', function(data) {
    fifo.pause()

    t.equal(data, expected[index])
    t.equal(fifo.paused, true)

    fifo.write([4,5])

    fifo.on('data', function(data) {
      t.equal(data, expected[index])
      index++
    })

    index++
    fifo.resume()
  })

  fifo.on('end', function() {
    t.end()
  })
})

tape('example', function(t) {
  var test_stream = new Stream

  test_stream.writable = true
  seen = ''
  expected = '1234123'

  test_stream.write = function(data) {
    seen = seen + data
    return true
  }

  test_stream.end = function() {
    t.equal(seen, expected)
    t.end()
  }

  var starting_elements = [1, 2, 3, 4]

  var fifo = new Fifo(starting_elements)

  fifo.write([1, 2, 3])

  fifo.pipe(test_stream)
})
