// @ts-check
require('dotenv').config()

const app = require('./app');
const server = require('./websocket');

const { PORT, WSPORT } = require('./common');

const { connectToDatabase } = require('./mongo');

connectToDatabase()  
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App listening at ${PORT}`);
        }) 
        server.listen(WSPORT, () => {
            console.log(`WebSocket Server is listening at http://localhost:${ WSPORT }`);
        });
    })
    .catch(error => {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    });

