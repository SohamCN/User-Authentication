const express = require('express')
const app = express()

//const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotenv = require("dotenv")
const morgan = require('morgan')

dotenv.config({ path: 'config.env' })

const AuthRoutes = require('./routes/user')
const connectDB = require('./database/connection')
const postgresdb = require('./database/postgres-connection')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'User-Authentication-CRUD-API-Library',
            version:'1.0.0'
        }
    },
    apis: ['./routes/user.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)
//console.log(swaggerDocs);
// DB Connection
connectDB();
postgresdb.connected();

// Use parsing middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded())

// Using routes
app.use('/user',AuthRoutes) 
app.use(morgan('tiny')); //log requests
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

const port = process.env.PORT || 8000

postgresdb.sequelize.sync()    //this syncs model to the database by initializing the table or relation in the database according to model definition
.then(()=>{
  console.log("required database table and relations initialized");
})
.catch(err=>{
  console.log(err);
})

// Starting a server
app.listen(port, () => {
  console.log(`App is running at localhost:${port}`)
})