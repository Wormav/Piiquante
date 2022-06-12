const Sauce = require("../models/sauce.model");

// Cherche toutes les sauces dans la database

exports.findAllSauces = () => Sauce.find({}).exec();

// Créé et sauvegarde nouvelle sauce dans database

exports.addSauce = (sauceObj) => {
  const newSauce = new Sauce({ ...sauceObj });
  return newSauce.save();
};
