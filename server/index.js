require('module-alias/register')
const startAPIServer = require('./src/infrastructure/api/server')
const start = () => {
  startAPIServer()
}

start()
