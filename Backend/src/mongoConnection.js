import Mongo from 'mongodb';
let MongoClient = Mongo.MongoClient;
var url = "mongodb://localhost:27017";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Connected to DB!");
  
//   db.close();
// });


/*
* CLOSE the client object once you are finished
*/
module.exports.getDBConnection = async () => {
    const client = await MongoClient.connect(url, {useUnifiedTopology: true}).catch((err) => {
        console.error(err)
        throw err
    })
    await client.db("kamadanMarket").collection("Posts").createIndex("itemNameLower").catch((err) => {
        console.error(err)
    })
    return {
        "client": client,
        "db": client.db("kamadanMarket")
    }
}