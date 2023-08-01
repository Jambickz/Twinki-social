require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")


const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

const start = async () =>{
	try {
		app.listen(PORT, () => console.log(`server started ${PORT}`))
	}catch (e) {
		console.log(e)
	}
}

start().then()