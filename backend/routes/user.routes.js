const router = require('express').Router();
const userCtrl = require('../controllers/user.controllers')
const { signupValidator } = require('../middlewares/validators.middleware')

// routes /API/AUTH

router.post('/signup', signupValidator, userCtrl.signup);
router.post('/login', userCtrl.login)


// export for index routes 

module.exports = router