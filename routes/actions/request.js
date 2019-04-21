const actionLookup = require('./action-lookup')
const utils = require('../../utils/utils')
const {forOwn} = require('lodash')

const route = router => {
  forOwn(actionLookup, (v, k) => {
    const path = utils.getActionHttpPath(v, k)
    router.route(path).get((req, res) => {
      const data = v.valueFunc(req.params)
      if (data) {
        return res.status(200).json(data)
      } else {
        return res.status(404).end()
      }
    })
  })
}

module.exports = route
