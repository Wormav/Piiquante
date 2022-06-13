const fs = require("fs");
const sauceQueries = require("../queries/sauce.queries");

// Renvoi toutes les sauces

exports.getAllSauces = async (req, res) => {
  try {
    const allSauces = await sauceQueries.findAllSauces();
    res.status(200).json(allSauces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Renvoi une sauce avec son Id

exports.getOneSauce = async (req, res) => {
  try {
    const sauceId = req.params.id;
    const sauce = await sauceQueries.findSauceById(sauceId);
    if (!sauce)
      return res.status(401).json({ message: `Cette sauce n'existe pas` });
    return res.status(200).json(sauce);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créé et sauvegarde une sauce

exports.createSauce = async (req, res) => {
  try {
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const sauceObject = {
      ...JSON.parse(req.body.sauce),
      imageUrl,
      
    };
    await sauceQueries.addSauce(sauceObject);
    res.status(201).json({ message: "Sauce ajouté" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// modifie une sauce

exports.updateSauce = async (req, res) => {
  try {
    const sauceId = req.params.id;
    const update = {};

    // check si il y a une image ou non pour la modification

    if (req.file) {
      const sauce = await sauceQueries.findSauceById( sauceId );
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`public/images/${filename}`, (error) => {
        if (error) console.log(error);
      });
      update = {
        ...JSON.parse(req.body.sauce),
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        
      };
    } else update = { ...req.body };

    await sauceQueries.findSauceByIdAndUpdate( sauceId  ,  update );
    res.status(200).json({ message: 'Modifié' })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
