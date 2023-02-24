const {MongoClient} = require("mongodb")

MongoClient.connect('mongodb://localhost:27017/', {family:4}, function(err,db){

    const mydb1 = db.db("data01");
    mydb1.collection('client').find({"adresse.ville": "Lyon"})
                            .toArray(function(err,docs) {console.log(docs)});
})