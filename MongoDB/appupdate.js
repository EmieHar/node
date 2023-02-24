const {MongoClient} = require("mongodb")

MongoClient.connect('mongodb://localhost:27017/', {family:4}, function(err,db){
    
  const mydb = db.db("data01")
   
  mydb.collection('food').updateOne({name:'couscous'},
                                    { $set: { description: 'mais si il est très bon!'}})

  mydb.collection('products').updateMany({  } , { $set: { quantity: 20 } })
                             .then(function(){ db.close() })
                             .catch(function(err){ console.error(err) })
  });
 

