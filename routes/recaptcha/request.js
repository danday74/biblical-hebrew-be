const axios = require('axios')
const config = require('../../config')
const jsonResponse = require('../../js/json-response')
const validator = require('./validator')

const route = router => {
  router.route('/recaptcha/siteverify')
    .post(validator, (req, res) => {
      const captchaResponse = req.body.captchaResponse
      const secret = config.recaptcha.secret

      axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${captchaResponse}`).then(response => {
        return res.status(200).send(response.data)
      }).catch(() => {
        return jsonResponse(res, 500)
      })
    })
}

module.exports = route
