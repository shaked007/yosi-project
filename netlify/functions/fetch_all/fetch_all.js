const { MongoClient } = require("mongodb");

const mongoClient = new MongoClient(process.env.VUE_APP_URI);

const clientPromise = mongoClient.connect();

const handler = async (event) => {
    try {
        const database = (await clientPromise).db(process.env.VUE_APP_DATABASE);
        const collection = database.collection(process.env.VUE_APP_COLLECTION);
        const results = await collection.find({}).toArray();
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }