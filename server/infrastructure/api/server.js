require("dotenv").config()
const express = require("express")
const cors = require("cors")
const router = require("./user/router")
const {scopePerRequest} = require("awilix-express");
const container = require("../DI");
const errorMiddleware = require("../helpers/errorMiddleware");

const PORT = process.env.PORT || 5000


const start = async () =>{
	try {
		const app = express()
		app.use(scopePerRequest(container));
		app.use(express.json())
		app.use(cors())
		app.use(errorMiddleware);
		app.use("/api", router());
		app.listen(PORT, () => console.log(`server started ${PORT}`))
	}catch (e) {
		console.log(e)
	}
}

module.exports = start