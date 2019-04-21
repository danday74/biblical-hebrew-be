const db = require('../../db/db')
const jsonResponse = require('../../js/json-response')
const validator = require('./validator')

const route = router => {
  router.route('/user-exists/:username')
    .head(validator, (req, res) => {
      const username = req.params.username
      const user = db.get('users').find({username}).value()
      return jsonResponse(res, user ? 200 : 404)
    })
}

module.exports = route
