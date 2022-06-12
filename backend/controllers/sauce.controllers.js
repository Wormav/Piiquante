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
