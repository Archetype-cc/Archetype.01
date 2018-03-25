const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');
const express = require('express');
const http = require('http');
const stoppable = require('stoppable');
let app = express();
const server = stoppable(http.Server(app));
const HOST = 'http://localhost:';
let PORT;


// Argv
argv.loc = argv.loc || path.join(userHome, '/Archetype');


// Start the server
const startLocalServer = (dir, port)  => {
  PORT = 5555;
  app.use(express.static(`${argv.loc}`));

  app.get('/', (req, res) => {
    res.sendFile(`${argv.loc}/${dir}/index.html`);
  });

  server.listen(PORT, () => {
    console.log(`Server running at ${HOST}${PORT}`);
  });
};

const stopLocalServer = () => {
  server.stop();
  console.log(`Server at ${HOST}${PORT} stopped`);
};


module.exports = { startLocalServer, stopLocalServer }
