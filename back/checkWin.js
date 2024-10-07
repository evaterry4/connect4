const http = require('http');
const url = require('url');

const hostname = "127.0.0.1";
const port = 5001;
const server = http.createServer();

server.on('request', ( request, response) => {
    response.writeHead(200, { 'Content-type': 'application/JSON'});
    response.end(JSON.stringify( 1));
})

server.listen(port, hostname, () => console.log('server running on ' + port + ' at ' + hostname))

