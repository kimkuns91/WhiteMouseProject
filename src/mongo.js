// @ts-check

const mongoose = require('mongoose');

const { MONGO_PASSWORD, MONGO_CLUSTER, MONGO_USER, MONGO_DBNAME } = require('./common')

const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`

const client = mongoose.connect(MONGO_URL, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function connectToDatabase() {
  try {
    await client
    console.log('MongoDB 연결 성공');
  } catch (error) {
    console.error('MongoDB 연결 실패:', error);
    throw new Error('MongoDB connection failed');
  }
}

module.exports = {
  connectToDatabase
}
