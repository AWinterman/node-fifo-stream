# fifo-stream

A streaming fifo-stream

```js

Fifo = require('fifo-stream')

var starting_elements = [1, 2, 3, 4]

var fifo = new Fifo(starting_elements)

fifo.on('data', console.log.bind(console))

fifo.elenents.push("

