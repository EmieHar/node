var fs = require("fs");

console.log("je vais lire input.txt");

// console.log affiché avant que fichier.txt soit lu (=asynchrone --> fonction callback)
fs.readFile('input.txt','utf-8', function(err,data) {
    console.log(data.toString()) 
    fs.readFile('input2.txt','utf-8', function(err,data2) {console.log(data2.toString()) 
    }) 
 });
 //promesses inventée pour éviter d'avoir des miliers d'acolades si de nombreux fichiers à lancer dans un ordre précis
console.log('je continue');

// console.log affiché apres que fichier.txt soit lu --> synchrone
// var data = fs.readFileSync('input.txt');
// console.log(data.toString());
// var data2 = fs.readFileSync('input2.txt');
// console.log(data2.toString());
// console.log('je continue');