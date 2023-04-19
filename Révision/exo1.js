const express = require('express')
const app = express()
app.use(express.json())

const mongoclient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

let db = null;
mongoclient.connect(url).then(function (client) {
    db = client.db('zoo')
});

const boeuf = {
    name: "JOJO",
    weight: 540,
    gender: 'm',
}

const chat = {
    name: "INOX",
    weight: 5,
    gender: 'm',
}

app.get('/insertAnimal', (req, res) => {
    try {
        db.collection('animaux').insertOne(boeuf)
    }
    catch (e) {
        console.log(e)
    }
    res.json('ok');;
});

app.get('/insertAnimal2', (req, res) => {
    try {
        db.collection('animaux').insertOne(chat)
    }
    catch (e) {
        console.log(e)
    }
    res.json('minou');;
});

app.get('/findAnimal', (req,res) => {
    try {
        db.collection('animaux').find({}).toArray()
        .then(docs => {
            console.log(docs);
            res.json({ ok: docs });
        })
        .catch(err => console.log(err));
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

app.get('/updateOne', (req,res) => {
    try {
        db.collection('animaux').updateOne({ name: 'JOJO' } , { $set : { name : "JooooJooo" }})
        res.json('modification faite');
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
});

app.listen(8082, () => console.log('le serveur écoute sur le port: 8082'));