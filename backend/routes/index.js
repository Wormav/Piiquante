const router = require('express').Router()
const userRoutes = require('./user.routes')
const sauceRoutes = require('./sauce.routes')

// Routes /API

router.use('/auth', userRoutes)
router.use('/sauces', sauceRoutes)

module.exports = router