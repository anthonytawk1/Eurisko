require("dotenv").config();

module.exports = {
    server: {
        port: process.env.PORT
    },
    database: {
        connectionString: process.env.DB_CONNECTION_STRING
    },
    modelNames: {
        album: 'Album',
        category: 'Category',
        track: 'Track',
        user: 'User'
    },
    jwt: {
        accessToken: process.env.JWT_ACCESS_SECRET
    }
}