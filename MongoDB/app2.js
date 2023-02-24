const {MongoClient} = require("mongodb")

MongoClient.connect('mongodb://localhost:27017/', {family:4}, function(err,db){

    const mydb1 = db.db("unicorn")

    const mydb = db.db("data01")

    mydb1.createCollection("users",function(err) {

           mydb1.collection("users").insertMany([
                    {firstname: "jeanx" , lastname: "valjeanx", email: "jvx@gmail.com"},
                    {firstname: "pol"   , lastname: "jones"   , email: "jp@gmail.com" },
                    {firstname: "jak"   , lastname: "ko"      , email: "jk@gmail.com" }
               ],function(err,rep) {
               if (err) throw err ;
                   db.close();
           })

        mydb1.collection('users').find({}, {projection: {_id:0 , firstname: 1}}).toArray(function(err,docs){console.log(docs)});
           
        mydb1.collection('users').find({ firstname: { $in: ['jak','pol'] }}).toArray(function(err,docs){console.log(docs)});

        mydb.collection('products').find({quantity: { $gt:12}} , 
                                          { projection: { _id:0, reviews:0}},
                                          {sort: {quantity: 1 }})// renge par ordre croissant / -1 par ordre décroissant
                                .toArray(function(err,docs){console.log(docs)});

        mydb.collection('food').insertMany([
            {name: 'couscous', description: 'il est bon mon couscous, il est bon'},
            {name: 'LASAGNE', description: 'garfield dégage!'},
            {name: 'axoa de veau', description: 'du veau aché avec de bon piments'}
        ])
    
    })
    
    mydb.createCollection("client",function(err) {});
    var client1 = {
        nom : "Dupont",
        prenom : "Valentin",
        adresse : {
        rue : "17 rue Villeneuve",
        cp : "69000",
        ville : "Lyon"
        }}
    
    
        var client2 = {
            nom : "Deedee",
            prenom : "Ramones",
            adresse : {
            rue : "Madison",
            cp : "69000",
            ville : "New-York"
            }
        }
    
    
        var client3 = {
            nom : "Lemy",
            prenom : "Motorhead",
            adresse : {
            rue : "Portobello",
            cp : "69000",
            ville : "London"
            }
        }

        mydb.collection('client').insertOne(client1)
        mydb.collection('client').insertOne(client2)
        mydb.collection('client').insertOne(client3).then (function() {db.close()});
    
});