const http = require('http');
const url = require('url');

const hostname = "127.0.0.1";
const port = 5006;
const server = http.createServer();

server.on('request', ( request, response) => {
    let q = url.parse(request.url, true);

    response.writeHead(200, { 'Content-type': 'application/JSON'});
    if (q.pathname === '/checkWin') {
        const board = JSON.parse(q.query['board']);
        const curPlayer = Number(q.query['curPlayer']);
        const result = checkWin(board, curPlayer);
        response.end(JSON.stringify({ win: result }));
    } 
    else {
        return;
    }
    // response.end(JSON.stringify( handleRequest(q)));
})

// const server = http.createServer((request, response) => {
//     let q = url.parse(request.url, true);
//     response.writeHead(200, { 'Content-Type': 'application/json' });

//     if (q.pathname === '/checkwin') {
//         const board = JSON.parse(q.query['board']);
//         const curPlayer = Number(q.query['curPlayer']);
//         const result = checkWin(board, curPlayer);
//         response.end(JSON.stringify({ win: result }));
//     } 
//     else {
//         response.end(JSON.stringify({ error: "Invalid endpoint" }));
//     }
// });

function checkWin(row, col) {
    return this.checkDirection(row, col, 1, 0) ||  //horizontal
           this.checkDirection(row, col, 0, 1) ||  // vertical
           this.checkDirection(row, col, 1, 1) ||  // diag (right & up)
           this.checkDirection(row, col, 1, -1);   // diag (left and down)
}

function checkDirection(row, col, rowDir, colDir) {
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
