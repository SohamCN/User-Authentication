const mongoose= require('mongoose')
const express = require('express')
const app = express()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config({ path: 'config.env' })

const AuthRoutes = require('./routes/user')

// DB Connection
mongoose.connect(process.env.DATABASE/*{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}*/).then(() => {
  console.log("DB CONNECTED")
}).catch(() => {
  console.log("UNABLE to connect to DB")
})

// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Using routes
app.use('/user',AuthRoutes) 


const port = process.env.PORT || 8000

// Starting a server
app.listen(port, () => {
  console.log(`App is running at ${port}`)
})