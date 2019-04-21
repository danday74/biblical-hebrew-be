const db = require('../../db/db')
const jsonResponse = require('../../js/json-response')
const validator = require('./validator')
const {cloneDeep} = require('lodash')

const route = router => {
  router.route('/create-user')
    .post(validator, (req, res) => {
      let user
      const username = req.body.username
      const password = req.body.password
      user = db.get('users').find({username}).value()
      if (user) {
        return jsonResponse(res, 409) // 409 = Conflict (already exists)
      } else {
        db.set('users.' + username, {username, password}).write()
        user = db.get('users').find({username, password}).value()
        if (user) {
          user = cloneDeep(user)
          delete user.password
          return res.status(201).send(user)
        } else {
          return jsonResponse(res, 500)
        }
      }
    })
}

module.exports = route
