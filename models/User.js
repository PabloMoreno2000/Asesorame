const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
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
  // Not required because not all users are tutors
  tutorInfo: {
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
  },
});

module.exports = User = mongoose.model("user", UserSchema);
