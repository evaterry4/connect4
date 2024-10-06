const http = require('http');
const url = require('url');

const hostname = "127.0.0.1";
const port = 4003;
const server = http.createServer();

server.on('request', ( request, response) => {
    let q = url.parse(request.url, true);

    response.writeHead(200, { 'Content-type': 'application/JSON'});
    // response.end(JSON.stringify( handleRequest(q)));
})

server.listen(port, hostname, () => console.log('server running on ' + port + ' at ' + hostname))

