const PORT = process.env.PORT || 8080
const WSPORT = process.env.WSPORT || 8081

const MONGO_USER = process.env.MONGO_USER || 'kimkuns'
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'rlawldi98'
const MONGO_CLUSTER = process.env.MONGO_CLUSTER || 'cluster0.qtkzt.mongodb.net'
const MONGO_DBNAME = process.env.MONGO_DBNAME || 'WhiteMouseProjects'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'FDV11fSVCEWWFSDFDSFDSFVCXCC';
const ACCESS_KEY = 'AKIAT65CHJF4YZA6BOAF';
const SECRET_ACCESS_KEY = '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';
const REGION = "ap-northeast-2";
const S3_BUCKET = 'white-mouse-bucket';
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
