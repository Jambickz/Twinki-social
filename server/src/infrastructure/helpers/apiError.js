const ERRORS = {
  // Authentication errors
  AUTHENTICATION_FAILED: { code: 401, text: 'ERROR_AUTHENTICATION_FAILED' },
  ERROR_LOGIN_INVALID: { code: 401, text: 'ERROR_LOGIN_INVALID' },
  ERROR_PASS_INVALID: { code: 401, text: 'ERROR_PASS_INVALID' },
  ERROR_TOKEN_BROKEN: { code: 401, text: 'ERROR_TOKEN_BROKEN' },
  ERROR_CODE_ACTIVATION_INVALID: { code: 400, text: 'ERROR_CODE_ACTIVATION_INVALID' },

  // User errors
  USER_NOT_FOUND: { code: 404, text: 'ERROR_USER_NOT_FOUND' },
  ERROR_USER_ALREADY_EXISTS: { code: 409, text: 'ERROR_USER_ALREADY_EXISTS' },

  // Common errors
  INVALID_INPUT: { code: 400, text: 'ERROR_INVALID_INPUT' },
  DEFAULT: { code: 500, text: 'ERROR_INTERNAL' },

  // Database errors
  DATABASE_ERROR: { code: 500, text: 'ERROR_DATABASE_ERROR' },
  ERROR_FIND_SESSION: { code: 500, text: 'ERROR_FIND_SESSION' },
  ERROR_CREATE_SESSION: { code: 500, text: 'ERROR_CREATE_SESSION' },

  // Other errors
  RESOURCE_NOT_AVAILABLE: { code: 404, text: 'ERROR_RESOURCE_NOT_AVAILABLE' },
  TIMEOUT_ERROR: { code: 504, text: 'ERROR_TIMEOUT' }
}

module.exports = class APIException extends Error {
  constructor (message, data = {}) {
    const errorData = ERRORS[message] ?? ERRORS.DEFAULT
    super(errorData.text)
    this.message = errorData.text
    this.data = data ?? {}
    this.statusCode = errorData.code
  }
}
