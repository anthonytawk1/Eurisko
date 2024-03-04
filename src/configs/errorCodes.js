module.exports = {
    conflict:{
        statusCode: 409,
        message: 'conflict'
    },
    notFound:{
        statusCode: 404,
        message: 'notFound'
    },
    internalServerError: {
        statusCode: 500,
        message: 'internalServerError'
    },
    unauthorized: {
        statusCode: 401,
        message: 'unauthorized'
    }
}