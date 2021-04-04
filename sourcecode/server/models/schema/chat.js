const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "users", require: true },
  userInfoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userInformations",
    require: true,
  },
  userName: String,
  userFirstname: String,
  userAvatar: String,
  userReadStatus: Boolean,
  technicianID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  technicianInfoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userInformations",
    require: true,
  },
  technicianName: String,
  technicianFirstname: String,
  technicianAvatar: String,
  technicianReadStatus: Boolean,
  recentMessage: {
    _id: false,
    sender: mongoose.Schema.Types.ObjectId,
    message: String,
    msgType: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  history: [
    {
      _id: false,
      sender: mongoose.Schema.Types.ObjectId,
      message: String,
      msgType: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = chatSchema;
