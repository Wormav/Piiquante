const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce.controllers');

router.get('/sauces', sauceCtrl.getAllSauces)
router.get('/sauces/:id', sauceCtrl.getOneSauce)
router.post('/sauces', sauceCtrl.createSauce)

module.exports = router
