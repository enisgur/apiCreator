const mongoose = require("mongoose");

const ApisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  userInfo: {
    username: {
      type: String,
    },
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
    default: 1, // 1-get  2-post  3-put  4-delete
  },
  route: {
    type: String,
    requried: true,
  },
  isDatabase: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  requested: {
    type: Number,
    default: 1,
  },
  totalRequested: {
    type: Number,
    default: 1,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

mongoose.pluralize(null);
module.exports = Apis = mongoose.model("apis", ApisSchema);
