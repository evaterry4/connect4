const http = require('http');
const url = require('url');

const hostname = "127.0.0.1";
const port = 5000;
const server = http.createServer();

server.on('request', ( request, response) => {
    let q = url.parse(request.url, true);

    response.writeHead(200, { 'Content-type': 'application/JSON'});
    response.end(JSON.stringify( handleRequest(q)));
})

server.listen(port, hostname, () => console.log('server running on ' + port + ' at ' + hostname))

function handleRequest(q) {
    if(q.pathname == "/start"){
        game = new Game();
    } 
    else if(q.pathname == "/dropChip"){
        let colNum = Number(q.query['col']);
        let curPlayerColor = q.query['selectedPlayer'];
        if((curPlayerColor == "red" && game.curPlayer == 0) || (curPlayerColor == "yellow" && game.curPlayer == 1)){
            game.dropChip(colNum);
        }       
    }
    else if(q.pathname == "/getGameState"){
        return game;
    }
    
    return game;
}


class Game {
    constructor () {
        this.rows=6;
        this.cols=7;
        this.gameStatus = "new";
        this.curPlayer = 0;
        this.board = Array(this.rows).fill().map(() => Array(this.cols).fill('')); 
        this.turnCount = 0;
    }

    dropChip(col) {
        if(this.gameStatus == "complete"){
            return;
        }
        for (let row = this.rows - 1; row >= 0; row--) {  // Start from the bottom
            if (this.board[row][col] === '') {
                this.board[row][col] = this.curPlayer;
                this.curPlayer = this.switchPlayer(this.curPlayer);
                return this.board;
            }
        }
    }

    switchPlayer(curPlayer){
        return (curPlayer == 0) ? 1 : 0;
    }

}

var game = game || new Game();