const guestUserName = 'Guest'

const config = {
  defaultUsers: {
    [guestUserName]: {
      username: guestUserName,
      password: 'test'
    }
  },
  port: 4002
}

module.exports = config
