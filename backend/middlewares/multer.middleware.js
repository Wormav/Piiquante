const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configuration nom de fichiers et dossiers

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const newFilename = `${Date.now()}${file.originalname}${extension}`;
    cb(null, newFilename);
  },
});

// Configuration type de fichiers ok

const typeFiles = ["image/png", "image/jpg", "image/jpeg"];
const limits = {
  fileSize: 2000000,
};

// middelware de stockage des images

exports.sauceImgStorage = (req, res, next) => {
  multer({ storage, limits }).single("image")(req, res, (err) => {
    if (err && err.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(400)
        .json({
          message: `L'image doit être envoyée dans le champ prévu à cette effet`,
        });
    }
    if (err && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: `L'image est limité à 2Mo` });
    }
    if (req.file && !typeFiles.includes(req.file.mimetype)) {
      fs.unlink(`public/images/${req.file.filename}`, (error) => {
        if (error) console.log(error);
      });
      return res
        .status(400)
        .json({ message: `Formats accéptés : Png, Jpg, Jpeg` });
    }
    if (err) return res.status(500).json({ message: err.message });
    return next();
  });
};
