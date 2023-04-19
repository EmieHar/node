const db = require('./db/connect');
const express = require('express');
const userRouter = require('./routers/router');
const ejs = require('ejs');
const Chat = require('./models/chat');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(userRouter);


app.set('view engine','ejs');

io.on('connection', (socket) => {
   
    console.log('connection');

    
    socket.on('nouveau message', (obj) => {
        console.log('nouveau message: ' + obj.message);
        let couleur = (Math.floor(Math.random()*0xFFFFFF)).toString(16);
        io.sockets.emit('reponse chat', obj, couleur)
    });

    socket.on('message en cours',(nom) => {
        socket.broadcast.emit('reponse message en cours', nom )
    });

    socket.on('enregistrer chat', (obj) => {
        let newChat = new Chat({
            idUser: obj.idUser,
            message: obj.message,
            username : obj.username,
            nom: obj.nom,
            prenom: obj.prenom,
            date: Date.now()
        })

        console.log(newChat);

        newChat.save()
               .then(()=>{})
               .catch(err => console.log(err));
    });
});

http.listen(port, () => {
    console.log('ecoute sur port', port);
});