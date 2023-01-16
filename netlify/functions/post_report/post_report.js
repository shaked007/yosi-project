const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.VUE_APP_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
    try {
      
     
        const database = (await clientPromise).db(process.env.VUE_APP_DATABASE);
        const collection = database.collection(process.env.VUE_APP_COLLECTION);
        console.log(event.body)
        const results = await collection.insertOne(
          JSON.parse(event.body)
         )
        return {
            statusCode: 200,
            body: event.body,
        }
    } catch (error) {
        return { statusCode: 500, body: event.body }
    }
}

module.exports = { handler }