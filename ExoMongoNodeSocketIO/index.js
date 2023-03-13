const db = require('./db/connect');
const express = require('express');
const userRouter = require('./routers/router');
const ejs = require('ejs');


const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(userRouter);

app.set('view engine','ejs');

io.on('connection', (socket, masocket) => {
   
    console.log('connection');

    
    socket.on('nouveau message', (obj) => {
        console.log('nouveau message: ' + obj.message);
        
        io.sockets.emit('reponse chat', obj)
    });

    socket.on('message en cours',(nom) => {
        socket.broadcast.emit('reponse message en cours', nom )
    });

    socket.on('enregistrer chat', (obj) => {
        let newChat = new Chat({
            iduser: obj.id,
            message: obj.message,
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