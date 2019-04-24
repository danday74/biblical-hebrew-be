const guestUserName = 'Guest888'

const config = {
  defaultUsers: {
    [guestUserName]: {
      username: guestUserName,
      password: 'Yeshua'
    }
  },
  port: 4002,
  recaptcha: {
    secret: 'NkxlZXdKMFVBQUFBQUR1Y0xDcVMzVnNFOEx5YUg2V2QxNTBPNE5ORw=='
  },
  usernameAndPasswordRegex: /^[a-zA-Z0-9\u0590-\u05FF]{6,15}$/,
  usernameAndPasswordRegexNoLength: /^[a-zA-Z0-9\u0590-\u05FF]*$/
}

module.exports = config
