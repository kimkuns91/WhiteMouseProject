const PORT = process.env.PORT
const WSPORT = process.env.WSPORT

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_CLUSTER = process.env.MONGO_CLUSTER
const MONGO_DBNAME = process.env.MONGO_DBNAME
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const ACCESS_KEY = process.env.ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY
const REGION = process.env.REGION
const S3_BUCKET = process.env.S3_BUCKET
const OPENAI_KEY = process.env.OPENAI_KEY
/* eslint-disable prefer-destructuring */

/** @type {string} */
const APP_CONFIG_JSON = JSON.stringify({
    PORT,
    WSPORT,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_CLUSTER,
    MONGO_DBNAME,
    JWT_SECRET_KEY,
    ACCESS_KEY,
    SECRET_ACCESS_KEY,
    REGION,
    S3_BUCKET,
    OPENAI_KEY
}).replace(/"/g, '\\"')

module.exports = {
    APP_CONFIG_JSON,
    PORT,
    WSPORT,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_CLUSTER,
    MONGO_DBNAME,
    JWT_SECRET_KEY,
    ACCESS_KEY,
    SECRET_ACCESS_KEY,
    REGION,
    S3_BUCKET,
    OPENAI_KEY
}
