const router = require('express').Router();
const userCtrl = require('../controllers/user.controllers')

// routes /API/AUTH

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login)


// export for index routes 

module.exports = router