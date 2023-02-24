var events = require('events');

var eventEmitter = new events.EventEmitter();

eventEmitter.on('evenementDramatique', function() {console.log("Drame!!!")})

console.log("j'écoute l'évènement evenementDramatique");

setTimeout(function() { eventEmitter.emit('evenementDramatique')} , 5000);