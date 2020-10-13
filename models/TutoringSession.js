// date scheduled, event date
const mongoose = require("mongoose");

const TutoringSessionSchema = new mongoose.Schema({
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true,
    },
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
    begins:{
        type: Date,
        required: true,
    },
    // How many minutes the session has
    minutstime: {
        type: Number,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Subject = mongoose.model("tutoringsession", TutoringSessionSchema);
