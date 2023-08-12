const UAParser = require('ua-parser-js')

const userAgentMiddleware = (req, res, next) => {
  const parser = new UAParser(req.headers['user-agent'])
  req.userAgentResult = parser.getResult()
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const browser = `${req.userAgentResult.browser.name} | ${req.userAgentResult.browser.version}`
  const os = req.userAgentResult.os.name
  const device = req.userAgentResult.device.type || 'desktop'
  req.sessionData = {
    ip,
    browser,
    os,
    device
  }
  next()
}

module.exports = userAgentMiddleware
