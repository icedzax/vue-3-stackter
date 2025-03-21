const fetch = require('node-fetch')

const handler = async function () {
    try {
        const response = await fetch(
            'https://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1?key=D92ADA35EC43FAF861D0200FEFCAA05B',
            {
                headers: { Accept: 'application/json' },
            }
        )
        if (!response.ok) {
            // NOT res.status >= 200 && res.status < 300
            return { statusCode: response.status, body: response.statusText }
        }
        const data = await response.json()

        return {
            statusCode: 200,
            body: JSON.stringify({ msg: data.joke }),
        }
    } catch (error) {
        // output to netlify function log
        console.log(error)
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: JSON.stringify({ msg: error.message }),
        }
    }
}

module.exports = { handler }
