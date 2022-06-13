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
    const sauce = await sauceQueries.findSauceById({sauceId})
    if(!sauce) return res.status(401).json({ message: `Cette sauce n'existe pas` })
    return res.status(200).json(sauce)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Créé et sauvegarde une sauce

exports.createSauce = async (req, res) => {
  try {
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const sauceObject = {
      ...JSON.parse(req.body.sauce),
      imageUrl,
      // userId: req.user._id,
    };
    await sauceQueries.addSauce(sauceObject);
    res.status(201).json({ message: 'Sauce ajouté'})
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
