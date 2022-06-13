const Sauce = require("../models/sauce.model");

// Cherche toutes les sauces dans la database

exports.findAllSauces = () => Sauce.find({}).exec();

// Cherche une sauces avec son ID
 
exports.findSauceById = (sauceId) => Sauce.findById(sauceId).exec();

// Créé et sauvegarde nouvelle sauce dans database

exports.addSauce = (sauceObj) => {
  const newSauce = new Sauce({ ...sauceObj });
  return newSauce.save();
};

// trouve une sauce avec son Id et la modifie 

exports.findSauceByIdAndUpdate = (sauceId, update) => Sauce.findByIdAndUpdate(sauceId , update).exec()
