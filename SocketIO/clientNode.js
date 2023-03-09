const io = require("socket.io-client");

let socket = io.connect("http://localhost:3030")

socket.on("connect", () => {
    console.log("Connection établie");
    socket.emit("room", "requête from client");
    console.log("Pom POm POm POm POm POm POm POm POm POm POm");
    });
