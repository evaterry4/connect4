const http = require('http');
const url = require('url');

const hostname = "127.0.0.1";
const port = 4002;
const server = http.createServer();

// server.on('request', ( request, response) => {
//     let q = url.parse(request.url, true);

//     response.writeHead(200, { 'Content-type': 'application/JSON'});
//     response.end(JSON.stringify( handleRequest(q)));
// })
server.listen(port, hostname, () => console.log('server running on ' + port + ' at ' + hostname))

// function handleRequest(q) {
//     if(q.pathname = "/start"){
//         //start a new game
//     } else if(q.pathname = '/addRoll') {
        
//     }
// }

// class Game {
//     constructor () {
//         this.rollCount=0;
//         this.rollTotal=0;
//         this.totalTarget=25; //when the game is won
//         this.gameStatus = "new";
//     }

//     addRoll = (rollValue) => {
//         if(this.gameStatus=='complete') return;
//         this.rollCount++;
//         this.rollCount+= rollValue;
//         if(this.rollTotal >= this.totalTarget){
//             this.gameStatus = "complete";
//         }
//         else{
//             this.gameStatus = "active";
//         }
//     }
// }