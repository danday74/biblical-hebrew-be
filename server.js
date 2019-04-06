const slugify = require('slugify')
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
  'random': {
    valueFunc: () => Math.floor(Math.random() * 9999) + 1,
    withId: false
  },
  '[Questions] Questions Requested': {
    valueFunc: () => db.get('questions').value(),
    withId: false
  },
  '[Users] User Requested': {
    valueFunc: id => db.get('users').find({slug: id}).value(),
    withId: true
  }
}

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

app.head('/user-exists/:username', (req, res) => {
  const username = req.params.username
  const slug = slugify(username, {lower: true})
  const user = db.get('users').find({slug}).value()
  res.sendStatus(user ? 200 : 404)
})

forOwn(actionLookup, (value, key) => {
  let path = utils.getActionHttpPath(key)
  if (value.withId) path += '/:id'
  app.get(path, (req, res) => {
    const data = value.valueFunc(req.params.id)
    res.json(data)
  })
})

http.listen(3000, () => {
  console.log('listening on port', port)
  setInterval(() => {
    console.log('number of clients connected', io.engine.clientsCount)
  }, 10000)
})
