const express = require('express')
const app = express()

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const morgan = require('morgan')

dotenv.config({ path: 'config.env' })

const AuthRoutes = require('./routes/user')
const connectDB = require('./database/connection')

// DB Connection
connectDB()

// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Using routes
app.use('/user',AuthRoutes) 
app.use(morgan('tiny')); //log requests

const port = process.env.PORT || 8000

// Starting a server
app.listen(port, () => {
  console.log(`App is running at localhost:${port}`)
})