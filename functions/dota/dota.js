const fetch = require('node-fetch')

/* Get IP address https://www.ipify.org/ */
const API_ENDPOINT =
    'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v1?key=D92ADA35EC43FAF861D0200FEFCAA05B'

exports.handler = async (event, context) => {
    try {
        const data = await fetch(API_ENDPOINT, {
            method: 'GET',
        }).then((response) => response.json())
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } catch (e) {
        return {
            statusCode: 422,
            body: JSON.stringify({
                e: e.message,
            }),
        }
    }
}
