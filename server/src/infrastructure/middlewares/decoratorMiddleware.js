module.exports = (req, res, next) => {
  res.success = (data, message = '') => res.status(200).json({ status: true, data, message })
  res.error = (code, message = '', data) => res.status(code).json({ status: false, message, data, code })
  next()
}
