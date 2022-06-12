const Sauce = require('../database/models/Sauces')

exports.findAllSauces = () => Sauce.find({}).exec

exports.findSauceById = (sauceId) => Sauce.findById(sauceId).exec();

exports.addSauce = (sauceObject) => {
    const newSauce = new Sauce({ ...sauceObject });
    return newSauce.save();
  };