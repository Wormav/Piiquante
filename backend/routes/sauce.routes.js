const router = require("express").Router();
const { sauceImgStorage } = require("../middlewares/multer.middleware");
const saucesCtrl = require("../controllers/sauce.controllers");
const securityCtrl = require("../middlewares/security.middleware")
const likeCtrl = require('../controllers/likes.controller')

// route /API/SAUCES

router.get("/", securityCtrl.authenticated, saucesCtrl.getAllSauces);
router.get("/:id", securityCtrl.authenticated, saucesCtrl.getOneSauce);
router.post("/", securityCtrl.authenticated, sauceImgStorage, saucesCtrl.createSauce);
router.put("/:id", securityCtrl.authenticated, sauceImgStorage , saucesCtrl.modifySauce);
router.delete('/:id', securityCtrl.authenticated, saucesCtrl.deleteSauce)
router.post("/:id/like", securityCtrl.authenticated, likeCtrl.likeSauce)

module.exports = router;