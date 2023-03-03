const dotenv = require('dotenv');
//récupère lse infos clé/valeurs de .env

const path = require('path');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1/token')

const bcryptjs = require('bcryptjs');

const cors = require('cors');


const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

dotenv.config()

const User = require('./models/user')

function generateAccessToken(user) {
    // expire apres 50 minutes
    let tt = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '50m' });
    console.log(tt)
    return tt
}

function authenticateToken(req, res, next) {
    console.log(req.headers);

    const token = req.headers.authorization;
    console.log('TOKEN', token);

    if (token == null) { return res.sendStatus(401) } // if there isn't any token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
};

app.post('/user/signup', (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email })
        .then((user) => {

            if (user) {
                // si le user existe 
                res.status(400).send({ message: "Email existe deja!" });
            } else {
                var salt = bcryptjs.genSaltSync(10);
                var hash = bcryptjs.hashSync(req.body.password, salt);

                // creation de l'objet user à partir de la modelisation User mongoose 
                var user = new User({
                    name: req.body.name,
                    password: hash,
                    email: req.body.email
                });

                user.save().then(
                    res.status(200).send(user)
                )
            }
        }) // end exec
}); //end post

app.post('/user/login', (req, res) => {
    console.log(req.body);
    // dans req.boy j'ai l'email et le password
    User.findOne({ email: req.body.email })
        .then((user) => {

            if (!user) {
                console.log("no user")
                return res.status(404).send({ message: "User Not found." });
            }

            if (user) {
                console.log(user)
                const isValidPass = bcryptjs.compareSync(req.body.password, user.password)
                if (isValidPass) {
                    const token = generateAccessToken({ user: user })
                    console.log(token)
                    res.status(200).send(token);
                }
            }
        })
        .catch((error) => {
            console.log(err);
            res.status(500).send({ message: err });
        })
});

app.get('/api/orders', authenticateToken, (req, res) => {
    console.log("les portes sont ouvertes");
    res.send('ok');
});

app.listen(8082, () => console.log('le serveur écoute sur le port :8082'));
