var http = require('http');
var fs = require("fs");

http.createServer(function(request,response){
    response.writeHead(200,{'content-type': 'text/html'});
    fs.readFile('exo03.html','utf-8', function(err,data) {
        response.end(data.toString()) ;
    }); 
}).listen(8081);

    console.log("Le Serveur tourne sur le port 8081");// s'affiche dans la console du terminal
  