

const express = require('express')
const router = express.Router()

const usersRouter = require('./user');


router.use('/users', usersRouter);





module.exports = router