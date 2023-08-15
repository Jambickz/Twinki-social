module.exports = ({ tokenService, authService }) => async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.error(403, 'ERROR_NO_AUTHORIZATION')

  const [type, token] = authHeader.split(' ')

  if (type !== 'Bearer') return res.error(403, 'ERROR_INVALID_TOKEN_TYPE')

  const decodedId = tokenService.validateRefreshToken(token)
  if (!decodedId) return res.error(403, 'ERROR_TOKEN_BROKEN')

  const user = await authService.getBySessionId(decodedId)
  if (!user) return res.error(403, 'ERROR_SESSION_NOT_FOUND')

  next()
}
