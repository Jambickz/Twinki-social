const TEMPLATE = {
  USER: ['email', 'username', 'profileName', 'profilePicture', 'bio', 'verification', 'lastOnline']
}

module.exports = function filterObject (object, properties) {
  const template = TEMPLATE[properties] ?? properties
  if (!Array.isArray(template)) {
    return object
  }

  const objectKeys = Object.keys(object)
  const filteredObject = {}

  for (const prop of template) {
    if (objectKeys.includes(prop)) {
      filteredObject[prop] = object[prop]
    }
  }
  return filteredObject
}
