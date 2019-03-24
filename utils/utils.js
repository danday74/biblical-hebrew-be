const getActionHttpPath = action => {
  const httpPath = action.replace(/\[/g, '').replace(/]/g, '').replace(/ /g, '-').toLowerCase()
  return '/' + httpPath
}

module.exports = {
  getActionHttpPath
}
