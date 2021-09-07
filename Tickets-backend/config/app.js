require('dotenv').config()

module.exports = {
    appUrl:process.env.APP_URL,
    appPort:process.env.APP_PORT,
    dbAPI:process.env.DB_API,
    JwtSecret:process.env.SECRET
}