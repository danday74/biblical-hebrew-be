const guestUserName = 'Guest'

const config = {
  corsOptions: {origin: ['http://no-cors-allowed']},
  defaultUsers: {
    [guestUserName]: {
      username: guestUserName,
      password: 'test'
    }
  },
  port: 4002
}

module.exports = config
