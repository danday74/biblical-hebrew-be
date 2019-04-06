const getActionHttpPath = (value, action) => {
  let httpPath = '/' + action.replace(/\[/g, '').replace(/]/g, '').replace(/ /g, '-').toLowerCase()
  if (value.params.length === 1) {
    httpPath = `${httpPath}/:id`
  } else {
    value.params.forEach(param => httpPath = `${httpPath}/${param}/:${param}`)
  }
  return httpPath
}

module.exports = {
  getActionHttpPath
}
