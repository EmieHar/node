const express = require('express');
const app = express();
const mysql = require('mysql2');
const session = require('express-session');
const bcryptjs = require('bcryptjs');
const ejs = require('ejs');

// pour récupérer les éléments du body
app.use(express.urlencoded({extend:true}));

let Users = []

app.set('view engine','ejs')
// répertoire des vues par défaut: views
// app.set('views','mes_vues');

const mysqlStore = require('express-mysql-session')(session);

const options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'session_test',
}

let sessionStore = new mysqlStore(options);

app.use(session({
    secret: 'une phrase pour hash',
    store: sessionStore,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get('/', function(req, res){
    res.redirect('/signup')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', (req, res) => {
    console.log("body:", req.session)
    if(!req.body.id || !req.body.password){
        res.status ("400")
        res.send("erreur")
    }else {
        
        const existingUser = Users.find(function (user){
            return user.id === req.body.id
        })

        if (existingUser) {
            res.render('signup', {message: 'existe deja'})
            return
        }
        // Users.filter(function(user){
        //     if(user.id === req.body.id){
        //         res.render('signup', { message: 'existe déja'})
        //     }
        // })


        //encode le password (en 2 étapes)
        bcryptjs.genSalt(10, function(err, salt){
            bcryptjs.hash(req.body.password, salt, function(err,hash) {
                if (err) { console.log(err) ; res.redirect('/ok');  }
                else { 
                let user = { id: req.body.id,
                            password: hash}
                Users.push(user)
                req.session.user = user
                res.redirect('/ok')
                }
            })
        })
    }
})

app.get('/ok', (req, res) =>{
    console.log(req.session)
    res.send('ok')
})

app.listen(8082)