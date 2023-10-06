const APIException = require('../helpers/apiError')

module.exports = function (err, req, res, next) {
  if (err instanceof APIException) {
    return res.error(err.statusCode, err.message, err.data)
  }
  return res.error(500, 'ERROR_INTERNAL')
}
