const express = require('express')
const cors = require('cors')
const userRouter = require('./user/router')
const authRouter = require('./auth/router')
const { scopePerRequest } = require('awilix-express')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('../helpers/errorMiddleware')
const container = require('../DI')
const userAgentMiddleware = require('../helpers/userAgentMiddleware')

const PORT = process.env.PORT || 5000
const CLIENT = process.env.CLIENT_URL

module.exports = async () => {
  try {
    require('dotenv').config()
    const app = express()
    app.use(scopePerRequest(container))
    app.use(express.json())
    app.use(cookieParser())
    app.use(cors({
      origin: CLIENT,
      credentials: true
    }))
    app.use(userAgentMiddleware)
    app.use(errorMiddleware)

    app.use('/api', userRouter())
    app.use('/api', authRouter())

    app.listen(PORT, () => console.log(`server started ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
