const slugify = require('slugify')

const guestUserName = 'Guest'
const guestUserSlug = slugify(guestUserName, {lower: true})

const config = {
  corsOptions: {origin: 'http://localhost:4000'},
  defaultUsers: {
    [guestUserSlug]: {
      slug: guestUserSlug,
      name: guestUserName,
      password: 'test'
    }
  }
}

module.exports = config
