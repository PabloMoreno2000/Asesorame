const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Subject = mongoose.model("subject", SubjectSchema);
