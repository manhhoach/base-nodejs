const express = require('express')
const app = express()
require('dotenv').config()
const routers = require('./routers')
const cors = require('cors')
const { responseWithError } = require('./utils/response')
const path = require('path')




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




app.use(routers)
app.use((err, req, res, next) => {
  console.log('err in app: ', err);
  res.status(err.statusCode || 500).json(responseWithError(err))
})



module.exports = app