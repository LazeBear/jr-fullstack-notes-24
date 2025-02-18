const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const { generateToken } = require('../src/utils/jwt');

const clearDatabase = async () => {
  const collections = Object.values(mongoose.connection.collections);
  const promises = collections.map((c) => c.deleteMany({}));
  await Promise.all(promises);
};

const createTestUser = async () => {
  const counter = Math.floor(Math.random() * 1000);
  const userData = {
    username: `user${counter}`,
    password: 'password',
  };
  const user = await User.create(userData);
  const token = generateToken({ _id: user._id, username: user.username });
  return { user, token };
};

module.exports = {
  clearDatabase,
  createTestUser,
};
