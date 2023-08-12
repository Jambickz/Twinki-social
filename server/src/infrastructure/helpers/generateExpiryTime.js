module.exports = () => {
  const expiryTime = new Date()
  expiryTime.setHours(expiryTime.getHours() + 1)
  return expiryTime
}
