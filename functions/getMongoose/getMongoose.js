const mongodb = require('mongodb')

exports.handler = async function (event, context) {
    const client = await mongodb.connect(
        'mongodb+srv://icedza:11501150@dowdb.crmaouu.mongodb.net/?retryWrites=true&w=majority',
        { useUnifiedTopology: true }
    )
    const db = client.db()

    try {
        const dogs = await db.collection('book').find({ user: 'ice' }).toArray()
        client.close()
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dogs),
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
