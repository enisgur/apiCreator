const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  subscription: {
    type: Number,
    required: true,
    default: 1,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  apis: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "apis",
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

mongoose.pluralize(null);
module.exports = Users = mongoose.model("users", UsersSchema);
