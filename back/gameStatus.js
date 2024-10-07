const http = require('http');
const url = require('url');

const hostname = "127.0.0.1";
const port = 5001;
const server = http.createServer();

server.on('request', ( request, response) => {
    let q = url.parse(request.url, true);

    response.writeHead(200, { 'Content-type': 'application/JSON'});
    response.end(JSON.stringify( handleRequest(q)));
})
server.listen(port, hostname, () => console.log('server running on ' + port + ' at ' + hostname))

function handleRequest(q) {
    if(q.pathname == "/start"){
        //start a new game
        game = new Game();
    } else if(q.pathname == '/status') {
        let isActive = q.query['active'];
        let curPlayerNum = q.query['curPlayerNum'];
        let winnerNum = q.query['winnerNum'];
        game.changeStatus(isActive);
        game.switchPlayer(curPlayerNum);
        game.setWinner(winnerNum);
        
    }
    return game;
}

class Game {
    constructor () {
        this.curPlayer = 0;
        this.active = true;
        this.winner = -1;
    }

    changeStatus(isCurActive){
        this.active = !isCurActive; 
    }

    switchPlayer(curPlayerNum){
        this.curPlayer = (curPlayerNum == 0) ? 1 : 0;
    }

    setWinner(winnerNum){
        this.winner = winnerNum;
    }
}

//instantiate object if it doesn't exist
var game = game || new Game();