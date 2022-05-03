const express = require('express')
const router = require('./router/routes')
const app = express()
require('./db/conn')
require('./model/storeSchema')
require('./model/vehicleSchema')
const cors = require('cors')
const port = 2000


// Body Parcer Middleware
app.use(express.urlencoded({ extended : true}))

//JSON Middleware
app.use(express.json());

//CORS Middleware
app.use(cors())

//Router Level Middleware
app.use(router)

app.listen(port, (err)=>{
    console.log(`server is listening on port ${port}`);
  })