const contentful = require('contentful')

const config = {
    space: process.env.spaceId,
    accessToken: process.env.accessToken
}

const client = contentful.createClient(config)

export default client