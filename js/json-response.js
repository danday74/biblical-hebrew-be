const status = require('statuses')

const jsonResponse = (res, statusCode) => {
  return res.status(statusCode).json({message: status[statusCode]})
}

module.exports = jsonResponse
