const config = require('../../config')
const Joi = require('joi')
const validate = require('express-validation')

const validator = {
  body: { // params, body, query, headers, cookies
    username: Joi.string().regex(config.usernameAndPasswordRegex).required(),
    password: Joi.string().regex(config.usernameAndPasswordRegex).required()
  }
}

module.exports = validate(validator)
