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
    secret: 'NkxlZXdKMFVBQUFBQUR1Y0xDcVMzVnNFOEx5YUg2V2QxNTBPNE5ORw=='
  },
  usernameAndPasswordRegex: /^[a-zA-Z0-9\u0590-\u05FF]{3,15}$/,
  usernameAndPasswordRegexNoLength: /^[a-zA-Z0-9\u0590-\u05FF]*$/
}

module.exports = config
