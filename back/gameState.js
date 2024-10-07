const http = require('http');
const url = require('url');

const hostname = "127.0.0.1";
const port = 5005;
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
                if(this.checkWin(row, col)){
                    console.log('${currentPlayer} wins!');
                }
                this.curPlayer = this.switchPlayer(this.curPlayer);
                // 
                return this.board;
            }
        }
    }

    switchPlayer(curPlayer){
        return (curPlayer == 0) ? 1 : 0;
    }

    checkWin(row, col) {
        return this.checkDirection(row, col, 1, 0) ||  // Horizontal
               this.checkDirection(row, col, 0, 1) ||  // Vertical
               this.checkDirection(row, col, 1, 1) ||  // Diagonal right-down
               this.checkDirection(row, col, 1, -1);   // Diagonal left-down
    }
    
    checkDirection(row, col, rowDir, colDir) {
        let count = 0;
        for (let i = -3; i <= 3; i++) {
            const r = row + i * rowDir;
            const c = col + i * colDir;
            if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.board[r][c] === this.curPlayer) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }


}

let game = new Game();
// var game = game || new Game();