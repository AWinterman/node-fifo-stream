# fifo-stream

A streaming fifo-stream

```js

Fifo = require('fifo-stream')

var starting_elements = [1, 2, 3, 4]

var fifo = new Fifo(starting_elements)

fifo.write([1, 2, 3])

fifo.pipe(process.stdout)
// writes:
// 1234123
```

## API

`fifo = require('fifo-stream')` returns a funciton.

`fifo(initial, options)` returns a readable/writable stream.

- `initial`: an array of objects which seed the fifo
- `options`: an object of options:
  - `ends`: (defaults to true) specifies whether or not the stream should end
    when the queue runs out of elements.

Uses through under the hood.
