const express = require('express')
const { scopePerRequest } = require('awilix-express')
const container = require('../DI')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userAgentMiddleware = require('../middlewares/userAgentMiddleware')
const decoratorMiddleware = require('../middlewares/decoratorMiddleware')
const errorMiddleware = require('../middlewares/errorMiddleware')
const userRouter = require('./user/router')
const authRouter = require('./auth/router')

const PORT = process.env.PORT || 5000
const CLIENT = process.env.CLIENT_URL

module.exports = async () => {
  const app = express()

  app.use(scopePerRequest(container))
  app.use(express.json())
  app.use(cookieParser())

  app.use(cors({
    origin: CLIENT,
    credentials: true
  }))

  app.use(userAgentMiddleware)
  app.use(decoratorMiddleware)

  app.use('/api', userRouter())
  app.use('/api', authRouter())
  app.use(errorMiddleware)

  app.listen(PORT, () => console.log(`server started ${PORT}`))
}
