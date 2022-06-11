const { MongoClient, ServerApiVersion } = require('mongodb')

exports.handler = async function (event, context) {
    const uri =
        'mongodb+srv://icedza:11501150@dowdb.crmaouu.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    })
    const hero = event.queryStringParameters.hero
    const book = client.db('book')

    try {
        const getBuild = await book
            .collection('build')
            .find({ hero: hero })
            .toArray()
        client.close()
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getBuild),
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: 'Please try again later.',
        }
    }
}
