const fetch = require('node-fetch')

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri =
    'mongodb+srv://icedza:11501150@dowdb.crmaouu.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
})

/* Get IP address https://www.ipify.org/ */
const API_ENDPOINT =
    'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=D92ADA35EC43FAF861D0200FEFCAA05B'

exports.handler = async (event, context) => {
    client.connect((err) => {
        const collection = client.db('test').collection('devices')
        // perform actions on the collection object
        return {
            statusCode: 200,
            body: JSON.stringify(collection),
        }
        client.close()
    })
}
