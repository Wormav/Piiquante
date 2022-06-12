const router = require('express').Router();
const saucesCtrl = require('../controllers/sauce.controllers');

// route /API/SAUCES

router.get('/', saucesCtrl.getAllSauces)

module.exports = router