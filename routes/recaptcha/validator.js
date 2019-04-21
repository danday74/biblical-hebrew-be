const Joi = require('joi')
const validate = require('express-validation')

const validator = {
  body: { // params, body, query, headers, cookies
    captchaResponse: Joi.string().required()
  }
}

module.exports = validate(validator)
