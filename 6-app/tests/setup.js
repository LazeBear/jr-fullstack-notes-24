const mongoose = require('mongoose');
const config = require('../src/utils/config');
const connectToDb = require('../src/utils/db');
const { clearDatabase } = require('./helper');
// lifecycle hook (function)

beforeAll(async () => {
  await mongoose.connect(config.DB_CONNECTION_STRING);
  // connectToDb();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
