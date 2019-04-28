const contentful = require('contentful')

const config = {
    space: process.env.spaceId,
    accessToken: process.env.accessToken
}

console.log(config, 4000)

const client = contentful.createClient(config)

export default client