const mongoose = require("mongoose");
const technicianInfoSchema = new mongoose.Schema({
  aptitude: [
    {
      _id: false,
      aptitude: String,
      star: Number,
      amountOfvoteStar: Number,
      amountOfcomment: Number,
      voteID: Object,
      comment: [
        {
          _id: false,
          userID: mongoose.Schema.Types.ObjectId,
          userInfoID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userInformations",
            require: true,
          },
          comment: String,
        },
      ],
    },
  ],
  workDay: [Number],
  workTime: {
    start: {
      hour: Number,
      minutes: Number,
    },
    end: {
      hour: Number,
      minutes: Number,
    },
  },
  acceptForm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
      require: true,
    },
  ],
  waitingForm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
      require: true,
    },
  ],
  newForm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "forms",
      require: true,
    },
  ],
  onSite: Boolean,
  frontStore: Boolean,
  address: {
    lat: Number,
    lon: Number,
  },
  description: String,
  bio: String,
  count: Number,
  star: Number,
  amount: Number,
  userInfoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userInformations",
    require: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
});
technicianInfoSchema.index({
  "aptitude.aptitude": "text",
  description: "text",
  bio: "text",
});
module.exports = technicianInfoSchema;
