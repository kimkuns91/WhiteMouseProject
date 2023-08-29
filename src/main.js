// @ts-check
console.log('start')
require('dotenv').config()

const app = require('./app');

const { PORT } = require('./common');
const { connectToDatabase } = require('./mongo');

connectToDatabase()  
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening at ${PORT}`);
        }) 
    })
    .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    });

