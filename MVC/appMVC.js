const express = require('express')
const app = express()
const ejs = require('ejs')

const bdd = require('./models/pool.js')

const PORT = 8082

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.set('views', __dirname + '/vues')
app.set('view engine','ejs')

app.get('/', (req, res) => res.render('index'))
app.get('/message', (req, res) => res.render('index', {message: "Bienvenue!"}))
// app.get('/actors', (req, res) => res.render('actors', {actors: [ { lastname: "McQueen", firstname: "Steve"},
//                                                                  { lastname: "Boedec", firstname: "Kévin"}
//                                                                 ]}))

app.get('/actors', (req, res) =>{
    bdd.getAll('actor', (actors) =>{
        console.log(actors)
        res.render('actors', {actors: actors})
    })
    
}) 

app.get('/actor/:id', (req, res) =>{
    bdd.getById('actor', req.params.id, (actor) =>{
        console.log(actor)
        res.render('actor', {act: actor})
    })
    
}) 


app.listen (PORT, ()=>console.log('listening on port' +PORT))
