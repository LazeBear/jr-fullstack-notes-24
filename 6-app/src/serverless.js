const app = require('./app');

const serverless = require('serverless-http');
const connectToDb = require('./utils/db');

connectToDb();
module.exports.handler = serverless(app);
