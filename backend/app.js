const express = require('express');
const path = require('path');
const routing = require('./routes');

// Initialise express

const app = express();

// Connection à la database

require('./config/database.config');

// hearder pour les reponses

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

  // middleware généreaux

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route pour '/api'

app.use('/api', routing)

// export l'app pour le serveur

module.exports = app