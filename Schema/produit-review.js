const express = require('express');
const mongoose = require('mongoose');

let db = require("./models.js");
console.log("DB ->", db)

mongoose.connect("mongodb://127.0.0.1/magasin", {})

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post("/creaprod", (req,res)=>{
    db.Product.create(req.body)
              .then( (p) => {res.json(p)})
})

app.listen(8082, () => console.log('le serveur écoute sur le port :8082'));