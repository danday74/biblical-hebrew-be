const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const db = require('./db/db')
const {cloneDeep, forOwn} = require('lodash')
const config = require('./config')
const utils = require('./utils/utils')

app.use(bodyParser.json())

app.use('/assets', express.static('assets'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const actionLookup = {
  'random': {
    valueFunc: () => Math.floor(Math.random() * 9999) + 1,
    params: []
  },
  '[Questions] Questions Requested': {
    valueFunc: () => db.get('questions').value(),
    params: []
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
  const user = db.get('users').find({username}).value()
  res.sendStatus(user ? 200 : 404)
})

app.post('/validate-user', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  let user = db.get('users').find({username, password}).value()
  if (user) {
    user = cloneDeep(user)
    delete user.password
    res.status(200).send(user)
  } else {
    res.sendStatus(401)
  }
})

forOwn(actionLookup, (v, k) => {
  const path = utils.getActionHttpPath(v, k)
  app.get(path, (req, res) => {
    const data = v.valueFunc(req.params)
    if (data) {
      res.status(200).json(data)
    } else {
      res.status(404).end()
    }
  })
})

http.listen(config.port, () => {
  console.log('listening on port', config.port)
  setInterval(() => {
    console.log('number of clients connected', io.engine.clientsCount)
  }, 10000)
})
