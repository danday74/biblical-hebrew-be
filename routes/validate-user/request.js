const db = require('../../db/db')
const jsonResponse = require('../../js/json-response')
const validator = require('./validator')
const {cloneDeep} = require('lodash')

const route = router => {
  router.route('/validate-user')
    .post(validator, (req, res) => {
      const username = req.body.username
      const password = req.body.password
      let user = db.get('users').find({username, password}).value()
      if (user) {
        user = cloneDeep(user)
        delete user.password
        return res.status(200).send(user)
      } else {
        return jsonResponse(res, 401)
      }
    })
}

module.exports = route
