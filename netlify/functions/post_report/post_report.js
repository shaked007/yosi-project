const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient('mongodb+srv://shakedbuk:AqWTlymx9DT7ESrD@cluster0.ffork.mongodb.net/?retryWrites=true&w=majority');

const clientPromise = mongoClient.connect();

const handler = async (event) => {
    try {
      
     
        const database = (await clientPromise).db('cluster0');
        const collection = database.collection('drives');
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