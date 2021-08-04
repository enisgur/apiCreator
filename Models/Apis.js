const moment = require("moment");
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
    email: {
      type: String,
    },
    name: {
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
  history: [{ type: Object, default: {} }],
  requestDate: {
    type: Date,
    default: Date.now,
    // default: moment().format("YYYY-MM-DD"),
  },
  requested: {
    type: Number,
    default: 1,
  },
  overRequested: {
    type: Number,
    default: 0,
  },
  totalOverRequested: {
    type: Number,
    default: 0,
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
