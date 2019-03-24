const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000
const db = require('./db/db')
const {forOwn} = require('lodash')
const config = require('./config')
const utils = require('./utils/utils')

app.use(cors(config.corsOptions))

app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const actionLookup = {
  'random': () => Math.floor(Math.random() * 9999) + 1,
  '[App] Questions Requested': () => db.get('questions').value()
}

io.on('connection', socket => {

  console.log('user connected')

  socket.on('disconnect', () => {console.log('user disconnected')})

  socket.on('message', ({type, payload}) => {

    console.log('incoming message', type, payload)

    const action = actionLookup[type]

    if (action) {
      io.emit('message', {type, payload: action()})
    }
  })
})

forOwn(actionLookup, (value, key) => {
  const path = utils.getActionHttpPath(key)
  app.get(path, (req, res) => {
    const data = value()
    res.json(data)
  })
})

http.listen(3000, () => {
  console.log('listening on port', port)
  setInterval(() => {
    console.log('number of clients connected', io.engine.clientsCount)
  }, 10000)
})
