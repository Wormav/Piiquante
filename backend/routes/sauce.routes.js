const router = require("express").Router();
const { sauceImgStorage } = require("../middlewares/multer.middleware");
const saucesCtrl = require("../controllers/sauce.controllers");

// route /API/SAUCES

router.get("/", saucesCtrl.getAllSauces);
router.get("/:id", saucesCtrl.getOneSauce);
router.post("/", sauceImgStorage, saucesCtrl.createSauce);
router.put("/:id", sauceImgStorage , saucesCtrl.updateSauce);

module.exports = router;
