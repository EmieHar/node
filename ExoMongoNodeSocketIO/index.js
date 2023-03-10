const db = require('./db/connect');
const express = require('express');
const userRouter = require('./routers/router');
const ejs = require('ejs');
const session = require('express-session');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(userRouter);

app.set('view engine','ejs');

io.on('connection', (socket, masocket) => {
    // un socket client se connecte
    console.log('connection');

    //le serveur node reçoit un message avec des données
    socket.on('chat message', (msg,nom) => {
        console.log('message: ' + msg);
        //le client renvoi un message avec d'autres données
        io.sockets.emit('reponse chat message', msg, nom)
    });

    socket.on('message en cours',(nom) => {
        socket.broadcast.emit('reponse message en cours', nom )
    });

    // socket.on('enregistrer chat', ()
});

http.listen(port, () => {
    console.log('ecoute sur port',port);
});