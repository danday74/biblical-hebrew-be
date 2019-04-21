const db = require('../../db/db')
const {cloneDeep} = require('lodash')

const actionLookup = {
  'random': {
    valueFunc: () => Math.floor(Math.random() * 9999) + 1,
    params: []
  },
  '[Questions] Questions Requested': {
    valueFunc: () => db.get('questions').value(),
    params: []
  },
  '[Users] User Requested': {
    valueFunc: params => {
      let user = db.get('users').find({username: params.id}).value()
      if (user) {
        user = cloneDeep(user)
        delete user.password
      }
      return user
    },
    params: ['id']
  }
}

module.exports = actionLookup
