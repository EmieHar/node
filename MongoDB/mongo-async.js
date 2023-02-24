const {MongoClient} = require("mongodb")
const client = new MongoClient("mongodb://localhost:27017");

async function run(){
    try{
        await client.connect()
        const database = client.db("unicorns")
        const collection = database.collection("users")
        let p = {firstname:"toto",lastname:"joni", email:"aa@aa.fr"}
        await collection.insertOne(p)

        console.log("ok")
    }

    finally{
        await client.close();
    }
}

run().catch(console.dir)