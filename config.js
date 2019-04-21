const guestUserName = 'Guest'

const config = {
  defaultUsers: {
    [guestUserName]: {
      username: guestUserName,
      password: 'test'
    }
  },
  port: 4002,
  recaptcha: {
    secret: '6LeewJ0UAAAAADucLCqS3VsE8LyaH6Wd150O4NNG'
  },
  usernameAndPasswordRegex: /^[a-zA-Z0-9\u0590-\u05FF]{3,15}$/,
  usernameAndPasswordRegexNoLength: /^[a-zA-Z0-9\u0590-\u05FF]*$/
}

module.exports = config
