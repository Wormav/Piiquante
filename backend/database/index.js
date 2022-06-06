const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Wormav:qwe@cluster0.tl7kw.mongodb.net/Piiquante?retryWrites=true&w=majority')
                .then(() => console.log('connexion DB ok!'))
                .catch(err => console.log(err))

