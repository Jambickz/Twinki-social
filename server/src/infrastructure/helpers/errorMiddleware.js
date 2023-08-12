module.exports = (req, res, next) => {
  res.success = (data, message) => res.status(200).json({ status: true, data, message })

  res.error = (code, message, error) => {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : error
    const errorName = error instanceof Error ? error.name : 'CustomError'
    res.status(code).json({ status: false, message, error: `${errorName}: ${errorMessage}` })
  }

  next()
}
