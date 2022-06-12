const mongoose = require('mongoose')

// connection à mongoDB

module.exports = mongoose
  .connect(
    "mongodb+srv://Wormav:qwe@cluster0.tl7kw.mongodb.net/Piiquante?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connexion à MongoDB réussie.'))
  .catch((err) => {
    console.error(`Erreur de connexion à MongoDB : ${err}`);
  });