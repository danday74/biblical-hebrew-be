const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000
const db = require('./db/db')

app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {

  console.log('user connected')

  socket.on('disconnect', () => {console.log('user disconnected')})

  socket.on('message', ({action, payload}) => {

    console.log('incoming message', action, payload)

    switch (action) {
      case '[App] Questions Requested': {
        const questions = db.get('questions').value()
        io.emit('message', {action, payload: questions})
        break
      }
    }
  })
})

http.listen(3000, () => {
  console.log('listening on port', port)
})
