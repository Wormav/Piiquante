const mongoose = require("mongoose");
const envDev = require("../environment/development");

// connection à mongoDB

module.exports = mongoose
  .connect(envDev.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie."))
  .catch((err) => {
    console.error(`Erreur de connexion à MongoDB : ${err}`);
  });
