const router = require('express').Router()
const userRoutes = require('./user.routes')

// Routes /API

router.use('/auth', userRoutes)

module.exports = router