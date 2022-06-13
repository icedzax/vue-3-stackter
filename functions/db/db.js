const { MongoClient, ServerApiVersion } = require('mongodb')

exports.handler = async function (event, context) {
    const uri =
        'mongodb+srv://icedza:11501150@dowdb.crmaouu.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    })
    const evt = event.queryStringParameters

    const build = Object.values(evt)[0]

    const req = {
        [Object.keys(evt)[1]]:
            Object.keys(evt)[1] === 'id'
                ? parseInt(Object.values(evt)[1])
                : Object.values(evt)[1],
    }

    const book = client.db('book')

    try {
        const getBuild = await book.collection(build).find(req).toArray()
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
