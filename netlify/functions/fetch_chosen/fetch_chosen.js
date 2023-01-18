const { MongoClient, ObjectId } = require("mongodb");

const mongoClient = new MongoClient('mongodb+srv://shakedbuk:AqWTlymx9DT7ESrD@cluster0.ffork.mongodb.net/?retryWrites=true&w=majority');

const clientPromise = mongoClient.connect();

const handler = async (event) => {
    try {
        const apiParams= event.queryStringParameters;
        const finalObject = {};
        finalObject['_id'] = apiParams.id
        const database = (await clientPromise).db('cluster0');
        const collection = database.collection('drives');
        const results = await collection.find({'_id':ObjectId(apiParams.id)}).toArray();
        console.log(finalObject)
        console.log(results)
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }