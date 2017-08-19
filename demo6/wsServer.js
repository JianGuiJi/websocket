/**
 * Created by jijg on 2017-08-18.
 */

var app = require('http').createServer();//handler
var io = require('socket.io')(app);
// var fs = require('fs');


var PORT = 8001;
var clientCount = 0;

app.listen(PORT);
// function handler (req, res) {
//     fs.readFile(__dirname + '/index.html',
//         function (err, data) {
//             if (err) {
//                 res.writeHead(500);
//                 return res.end('Error loading index.html');
//             }
//
//             res.writeHead(200);
//             res.end(data);
//         });
// }

io.on('connection', function (socket) {
    clientCount++;
    socket.nickname = 'user' + clientCount;
    // io.emit 广播
    io.emit('enter', socket.nickname + ' comes in');

    //  socket.emit 独播
    // socket.emit('news', {hello: 'world'});
    socket.on('message', function (str) {
        io.emit('message', socket.nickname + ' says:' + str);
    });
    socket.on('disconnect', function () {
        io.emit('leave', socket.nickname + ' left');
    })
});

console.log("WebSocket server listening on port " + PORT);