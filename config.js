const slugify = require('slugify')

const guestUserName = 'Guest'
const guestUserSlug = slugify(guestUserName, {lower: true})

const config = {
  corsOptions: {origin: ['http://no-cors-allowed']},
  defaultUsers: {
    [guestUserSlug]: {
      slug: guestUserSlug,
      username: guestUserName,
      password: 'test'
    }
  },
  port: 4002
}

module.exports = config
