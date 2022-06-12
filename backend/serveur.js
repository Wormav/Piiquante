const http = require('http');
const app = require('./app');

// Initialise le serveur avec express

const server = http.createServer(app);

// Normalise le port du serveur 

const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.SERVER_PORT || 3000);

  // Error 

  const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges.`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use.`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  server.on('error', errorHandler);

  // Les console log du serveur lancé

  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
    console.log(`Listening on  ${bind}`);
  });

  // lancé le serveur sur un port

  server.listen(port);