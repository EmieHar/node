var http = require('http');

http.createServer(function(request,response){
    response.writeHead(200,{'content-type': 'text/plain'});
    response.end('Hello World!')}).listen(8081);

    console.log("Le Serveur tourne sur le port 8081");// s'affiche dans la console du terminal
