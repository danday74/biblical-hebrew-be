const config = require('../config')
const FileSync = require('lowdb/adapters/FileSync')
const getQuestions = require('./questions/get-questions')
const low = require('lowdb')
const dbFileName = __dirname + '/db.json'
const adapter = new FileSync(dbFileName)
const db = low(adapter)

db.defaults({
  questions: getQuestions(),
  users: config.defaultUsers
}).write()

module.exports = db
