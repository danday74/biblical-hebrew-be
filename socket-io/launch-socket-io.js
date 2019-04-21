const actionLookup = require('../routes/actions/action-lookup')

const launchSocketIo = http => {

  const io = require('socket.io')(http)

  io.on('connection', socket => {

    console.log('user connected')

    socket.on('disconnect', () => {console.log('user disconnected')})

    socket.on('message', ({type, payload}) => {

      console.log('incoming message', type, payload)

      const action = actionLookup[type]

      if (action) {
        io.emit('message', {type, payload: action.valueFunc(payload)})
      }
    })
  })

  return io
}

module.exports = launchSocketIo
