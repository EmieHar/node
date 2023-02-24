const express = require('express'); // ==> consulter le site EXPRESS !!!! c'est riche d'informations
const fs = require("fs-extra");
const jsonfile = require('jsonfile');

const app = express(); 
const mysql =require('mysql2');

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json());


//create connexion
const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'cinema2',
});

app.get('/', function(req, res) { 
    let donnees= jsonfile.readFileSync('ghibli.json');
    res.json({ ok : donnees });
})

app.get('/films', (req, res) => {
    connexion.execute(`SELECT   
        director.firstname AS directfirstname, 
        director.lastname AS directlastname, 
        movie.*, 
        genre.name AS legenre,  
        actor.firstname AS actorfirstname, 
        actor.lastname AS actorlastname 
    FROM movie 
    INNER JOIN director ON movie.id_director = director.id 
    INNER JOIN genre ON movie.id_genre = genre.id 
    INNER JOIN joue ON joue.id_movie = movie.id
    INNER JOIN actor ON actor.id = joue.id_acteur `, function(err , results) {
        if(err) {console.log(err)}

        let films = [];

        results.forEach(function(movie) {
            let existingMovie = films.find(function(m) {
                return m.id === movie.id;
            });

            if (existingMovie) {
                let actor = new Object();
                actor.firstname = movie.actorfirstname;
                actor.lastname = movie.actorlastname;
                existingMovie.actors.push(actor);
            } else {
                let f = new Object();
                f.id = movie.id;
                f.titrefilm = movie.title;
                f.descriptions = movie.description;
                f.directorlastname = movie.directlastname;
                f.directorfirstname = movie.directfirstname;
                f.duration = movie.duration;
                f.date = movie.date;
                f.actors = [];

                let actor = new Object();
                actor.firstname = movie.actorfirstname;
                actor.lastname = movie.actorlastname;
                f.actors.push(actor);

                films.push(f);
            }
        });


        res.json({ ok: films });
    });
});

 app.get('/film/:id', (req, res) => {
 let id = req.params.id;
 connexion.execute(`
 SELECT DISTINCT  
    director.firstname AS directfirstname, 
    director.lastname AS directlastname, 
    movie.*, 
    genre.name AS legenre,  
    actor.firstname AS actorfirstname, 
    actor.lastname AS actorlastname 
 FROM movie 
 INNER JOIN director ON movie.id_director = director.id 
 INNER JOIN genre ON movie.id_genre = genre.id 
 INNER JOIN joue ON joue.id_movie = movie.id AND movie.id = ${id}
 INNER JOIN  actor ON actor.id = joue.id_acteur`, function(err , results) {
    if(err) {console.log(err)}
    console.log(results);
    res.json({ok:results})
   })
})

app.get('/actors', (req, res) => {
   connexion.execute('SELECT * FROM actor', function(err , results) {
    if(err) {console.log(err)}
    console.log(results);
    res.json({ok:results})
   })
})


app.post('/addactors', (req, res) => {
    console.log(req.body);
    connexion.execute('INSERT INTO actor (firstname, lastname) VALUES (?,?)',
        [req.body.firstname, req.body.lastname],
    function(err) {
        if(err) {console.log(err)}
        res.json({ok:true})

    })
});
app.listen(8082,() =>console.log('le serveur écoute sur le port :8082'));
