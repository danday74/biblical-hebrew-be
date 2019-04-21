const config = require('../../config')
const Joi = require('joi')
const validate = require('express-validation')

const validator = {
  params: { // params, body, query, headers, cookies
    username: Joi.string().regex(config.usernameAndPasswordRegexNoLength).required()
  }
}

module.exports = validate(validator)
