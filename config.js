const slugify = require('slugify')

const guestUserName = 'Guest'
const guestUserSlug = slugify(guestUserName, {lower: true})

const config = {
  corsOptions: {origin: ['http://localhost:4000', 'http://localhost:4001']},
  defaultUsers: {
    [guestUserSlug]: {
      slug: guestUserSlug,
      name: guestUserName,
      password: 'test'
    }
  },
  port: 4002
}

module.exports = config
