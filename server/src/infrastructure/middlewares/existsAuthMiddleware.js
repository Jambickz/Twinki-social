const APIException = require('~infrastructure/helpers/apiError')

module.exports = ({ tokenService, authService }) => async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const authHeader = req.headers.authorization

    if (!refreshToken || !authHeader) throw new APIException('AUTHENTICATION_FAILED')
    const [type, token] = authHeader.split(' ')
    if (type !== 'Bearer') throw new APIException('AUTHENTICATION_FAILED')

    const isRefreshTokenValid = tokenService.validateRefreshToken(refreshToken)
    if (!isRefreshTokenValid) throw new APIException('AUTHENTICATION_FAILED')

    const decodedId = tokenService.validateAccessToken(token)
    if (!decodedId) throw new APIException('AUTHENTICATION_FAILED')

    const user = await authService.getBySessionId(decodedId)
    if (!user) throw new APIException('AUTHENTICATION_FAILED')

    next()
  } catch (e) {
    next(e)
  }
}
