var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

var url = "mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=monreplika";

mongoClient.connect( url,  { useUnifiedTopology: true, family:4 } ,function(err, dab) {   //here db is the client obj
    if (err) throw err;

    var dbase = dab.db("test"); //here
    
    dbase.collection('retest').find().toArray(function(err,docs){ console.log(docs) })

});