const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isTutor: {
    type: Boolean,
    default: false,
  },
  // Not required because not all users are tutors
  tutorInfo: {
    // We just need the user's name when they are tutors
    name: {
      firstName: {
        type: String,
      },
      firstSurname: {
        type: String,
      },
      secondSurname: {
        type: String,
      },
    },
    // An array of references to the schema "subject"
    subjects: [
      {
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "subject",
        },
      },
    ],
    schedule: {
      // It will be a stringify JSON
      type: String,
    },
    tutoringLink: {
      type: String,
    },
  },
});

module.exports = User = mongoose.model("user", UserSchema);
