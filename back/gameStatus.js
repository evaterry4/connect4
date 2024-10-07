const http = require('http');
const url = require('url');

const hostname = "127.0.0.1";
const port = 5006;
const server = http.createServer();

server.on('request', ( request, response) => {
    let q = url.parse(request.url, true);

    response.writeHead(200, { 'Content-type': 'application/JSON'});
    response.end(JSON.stringify( handleRequest(q)));
})
server.listen(port, hostname, () => console.log('server running on ' + port + ' at ' + hostname))

function handleRequest(q) {
    let isActive = q.query['active'];
    let curPlayerNum = q.query['curPlayerNum'];
    let winnerNum = q.query['winnerNum'];
    gameStatus.changeStatus(isActive);
    gameStatus.switchPlayer(curPlayerNum);
    gameStatus.setWinner(winnerNum);
        
    
    return gameStatus;
}

class GameStatus {
    constructor () {
        this.curPlayer = 0;
        this.status = "new";
        this.winner = -1;
    }

    changeStatus(status){
        this.status = status; 
    }

    switchPlayer(curPlayerNum){
        this.curPlayer = (curPlayerNum == 0) ? 1 : 0;
    }

    setWinner(winnerNum){
        this.winner = winnerNum;
    }
}

//instantiate object if it doesn't exist
var gameStatus = gameStatus || new GameStatus();