const express = require('express'); // ==> consulter le site EXPRESS !!!! c'est riche d'informations
const fs = require("fs-extra");

const { MongoClient } = require("mongodb")
const client = new MongoClient("mongodb://127.0.0.1:27017", { useUnifiedTopology: true, family: 4 });

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

let mydb1 = null;
client.connect()
    .then(() => mydb1 = client.db("data01"))


app.get('/clients', (req, res) => {
    mydb1.collection('client').find({}).toArray(function (err, docs) {
        if (err) { console.log(err) }
        console.log(docs);
        res.json({ ok: docs })
    })
})

app.post('/addclient', (req, res) => {
    console.log(req.body);
    mydb1.collection("client").insertOne(
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            adresse: { rue: req.body.rue, cp: req.body.cp, ville: req.body.ville }
        },

        function (err) {
            if (err) { console.log(err) }
            res.json({ ok: true })
        }
    )
});

// app.get('/close', function (req, res) {
//     client.close()
// });




app.listen(8082, () => console.log('le serveur écoute sur le port :8082'));
