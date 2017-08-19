/**
 * Created by jijg on 2017-08-18.
 */
var ws = require("nodejs-websocket")

// Scream server example: "hi" -> "HI!!!"
var PORT = 3000;
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received " + str)
        conn.sendText("嗯，你好！ "+str.toUpperCase() + "!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error", function (err) {
        console.log("handle err");
        console.log(err);
    })
}).listen(PORT);
console.log("WebSocket server listening on port " + PORT);

// var server = ws.createServer(function (conn) {
//     console.log("New connection")
//     conn.on("binary", function (inStream) {
//         // Empty buffer for collecting binary data
//         var data = new Buffer(0)
//         // Read chunks of binary data and add to the buffer
//         inStream.on("readable", function () {
//             var newData = inStream.read()
//             if (newData)
//                 data = Buffer.concat([data, newData], data.length+newData.length)
//         })
//         inStream.on("end", function () {
//             console.log("Received " + data.length + " bytes of binary data")
//             process_my_data(data)
//         })
//     })
//     conn.on("close", function (code, reason) {
//         console.log("Connection closed")
//     })
// }).listen(8001)
