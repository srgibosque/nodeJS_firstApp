const http = require('http');
const routes = require('./routes');

const server = http.createServer(routes);

// Keeps listening for incoming requests
server.listen(3000);