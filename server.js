const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const config = require('./config')
const globby = require('globby')
// noinspection JSValidateTypes
const http = require('http').Server(app)
const jsonResponse = require('./js/json-response')
const launchSocketIo = require('./socket-io/launch-socket-io')

app.use(bodyParser.json())
app.use('/assets', express.static('assets'))
app.use('/', router)

const io = launchSocketIo(http)

globby([`${__dirname}/routes/**/request.js`]).then(paths => {
  paths.forEach(path => {
    require(path)(router)
  })
})

router.route('/').get((req, res) => {
  return res.sendFile(__dirname + '/index.html')
})

app.get('*', (req, res) => {
  return jsonResponse(res, 404)
})

http.listen(config.port, () => {
  console.log('listening on port', config.port)
  setInterval(() => {
    console.log('number of clients connected', io.engine.clientsCount)
  }, 60000)
})
