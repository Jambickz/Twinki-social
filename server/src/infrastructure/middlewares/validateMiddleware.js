module.exports = (schema) => async (req, res, next) => {
  const { error, value } = schema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }
  req.value = value
  next()
}
