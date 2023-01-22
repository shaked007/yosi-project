const { MongoClient, ObjectId } = require("mongodb");

const mongoClient = new MongoClient('mongodb+srv://shakedbuk:AqWTlymx9DT7ESrD@cluster0.ffork.mongodb.net/?retryWrites=true&w=majority');

const clientPromise = mongoClient.connect();

const handler = async (event) => {
    try {
      
     
        const database = (await clientPromise).db('cluster0');
        const collection = database.collection('drives');
        console.log(event.body['_id'])
        const results = await collection.deleteOne(
          {'_id': ObjectId(JSON.parse(event.body)['_id'])}
         )
         console.log(results)
        return {
            statusCode: 200,
            body: event.body,
        }
    } catch (error) {
        return { statusCode: 500, body: error.message }
    }
}

module.exports = { handler }