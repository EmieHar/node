const express = require('express')
const app = express()
const http = require('http').Server(app)

const io = require('socket.io')(http,{cors:{origin: "*"}})

io.on('connection', (socket)=>{
    console.log("client connected");

    socket.on('room', (msg)=>
        console.log(msg)
    );
})

http.listen(3030, "localhost");