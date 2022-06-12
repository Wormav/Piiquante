const router = require('express').Router();
const { sauceImgStorage } = require('../middlewares/multer.middleware')
const saucesCtrl = require('../controllers/sauce.controllers');

// route /API/SAUCES

router.get('/', saucesCtrl.getAllSauces)
router.post('/',sauceImgStorage, saucesCtrl.createSauce)

module.exports = router