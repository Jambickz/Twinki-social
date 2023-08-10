const express = require("express")
const cors = require("cors")
// const userRouter = require("./user/router")
const userRouter = require("./user/router")
const authRouter = require("./auth/router")
const {scopePerRequest} = require("awilix-express")
const cookieParser = require('cookie-parser')
const container = require("../DI")
const errorMiddleware = require("../helpers/errorMiddleware")
const userAgentMiddleware = require("../helpers/userAgentMiddleware")

const PORT = process.env.PORT || 5000


const start = async () => {
	try {
		require("dotenv").config()
		const app = express()
		app.use(scopePerRequest(container))
		app.use(express.json())
		app.use(cookieParser())
		app.use(cors())
		app.use(userAgentMiddleware)
		app.use(errorMiddleware)
		
		
		app.use("/api", userRouter())
		app.use("/api", authRouter())
		
		
		app.listen(PORT, () => console.log(`server started ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

module.exports = start