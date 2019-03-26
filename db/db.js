const getQuestions = require('./questions/get-questions')
const config = require('../config')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const dbFileName = __dirname + '/db.json'
const adapter = new FileSync(dbFileName)
const db = low(adapter)

db.defaults({
  questions: getQuestions(),
  users: config.defaultUsers
}).write()

module.exports = db
