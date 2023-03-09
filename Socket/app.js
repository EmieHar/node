const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/index2.html');
});

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
    // socket.on('changer couleur fond', () => {
    //     console.log('changement de couleur')
    //     let color = (Math.floor(Math.random()*0xFFFFFF)).toString(16);
    //     console.log('nouvelle couleur: #'+color);
    //     io.sockets.emit('changement de couleur', color )
    // });
    
    // console.log('connection - socket:'+ masocket.id);
    
    // masocket.on('chat message', (msg) => {
    //     console.log('message: ' + msg);
    //    //renvoyé à tout le monde sauf moi-même
    //     masocket.broadcast.emit('reponse chat message', msg + ' ok niquel')
    //     // renvoyé à l'envoyeur uniquement
    //     masocket.emit(masocket.id).emit('hello');
    //    // ou masocket.to(masocket.id).emit('hello')
    // });
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});