const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new Schema(
  {
    // _id: {},
    // email:{}
    username: {
      type: String,
      required: true, // basic validation
      unique: true, // unique index
      minLength: 3,
      maxLength: 20,
      // validate: {
      //   // regex
      //   validator: (value) => {
      //     return /^[a-zA-Z0-9]+$/.test(value);
      //   },
      //   message: (prop) => `${prop.value} is not a valid username`,
      // },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// document.hashPassword()
// user.hashPassword()
schema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 12);
};

schema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model('User', schema);

// closure (this), async, prototype
