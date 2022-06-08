const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Wormav:qwe@cluster0.tl7kw.mongodb.net/twitter?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));