const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017'

mongoClient.connect(url, (err,db)=>{

    if (err){ console.log('erreur')}

    console.log("connection à MongoDB")
    let datab = db.db('data01')
    let contact = { name: 'OpenLab', adresse:"9 rue Armand Rousseau"}

    try {
        datab.collection("adresses").insertOne(contact, () => { db.close();
                                                                process.exit()})
    } catch (e){
        console.log(e)
    }

})