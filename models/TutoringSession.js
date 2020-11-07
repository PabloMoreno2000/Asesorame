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
  },
  // How many minutes the session has
  ends: {
    type: Date,
    required: true,
  },
  begins: {
    type: Date,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
  },
  subjectName: {
    type: String,
    default: "",
  },
  userSeparated: {
    type: Date,
  },
});

module.exports = Subject = mongoose.model(
  "tutoringsession",
  TutoringSessionSchema
);
