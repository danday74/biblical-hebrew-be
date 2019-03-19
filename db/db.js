const getQuestions = require('./questions/get-questions')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const dbFileName = __dirname + '/db.json'
const adapter = new FileSync(dbFileName)
const db = low(adapter)
db.defaults({questions: getQuestions(), users: []}).write()

module.exports = db
