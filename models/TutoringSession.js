// date scheduled, event date
const mongoose = require("mongoose");

const TutoringSessionSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  // How many minutes the session has
  minutestime: {
    type: Number,
    required: true,
  },
  begins: {
    type: Date,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Subject = mongoose.model(
  "tutoringsession",
  TutoringSessionSchema
);
