const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const TS = require("../../models/TutoringSession");
const User = require("../../models/User");
const Subject = require("../../models/Subject");

// Tutor opens the slot to be yet adquired by a student
// Now tutor creates the session
router.post(
  "/create",
  [
    auth,
    [
      check("begins", "Favor de incluir hora de inicio").exists(),
      check("ends", "Favor de incluir la duracion").exists(),
    ],
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const { begins, ends } = req.body;
      const tutor = req.user.id;
      let newTS = new TS({
        tutor,
        begins,
        ends,
      });

      try {
        await newTS.save();
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong with the DB, try again.");
      }

      // TODO: Move this when students makes the move
      // Increase tutor's sessions counter by one
      await User.findByIdAndUpdate(tutor, {
        $inc: { "tutorInfo.sessionsGiven": 1 },
      });
      res.json(newTS);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

router.put(
  "/scheduleWithStudent",
  [
    auth,
    [
      check("sessionId", "Please send valid session id").isMongoId(),
      check("subjectId", "Please specify a subject key").isMongoId(),
    ],
  ],
  async (req, res) => {
    let session = {};
    try {
      const { sessionId, subjectId } = req.body;
      const subject = await Subject.findById(subjectId);
      session = await TS.findByIdAndUpdate(mongoose.Types.ObjectId(sessionId), {
        student: mongoose.Types.ObjectId(req.user.id),
        subject: mongoose.Types.ObjectId(subjectId),
        subjectName: subject.name,
        userSeparated: Date.now(),
      });
    } catch (error) {
      return res.status(500).send("Server error");
    }
    res.json(session);
  }
);

// @route DELETE sessions/delete/:id
// @desct Delete tutoring session by id
// @access private
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const session = await TS.findById(req.params.id);
    const userId = req.user.id;

    if (userId != session.tutor && userId != session.student) {
      return res.status(403).send("Access Denied");
    }

    // Decrease tutor's sessions counter by one
    /*await User.findByIdAndUpdate(session.tutor, {
      $inc: { "tutorInfo.sessionsGiven": -1 },
    });*/

    await TS.findByIdAndDelete(req.params.id);
    res.send("Tutoring session deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route GET sessions/details/:id
// @desct Get details of tutoring session by id
// @access private
router.get("/details/:id", auth, async (req, res) => {
  try {
    let session = await TS.findById(req.params.id)
      .populate("tutor", ["tutorInfo"])
      .populate("student", ["tutorInfo"]);
    const userId = req.user.id;

    if (userId != session.tutor._id && userId != session.student._id) {
      return res.status(403).send("Access Denied");
    }
    res.json(session);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route GET sessions/getSessionsByTutor
// @desct Gets all sesions where auth tutor is involved
// @access private
router.get("/getSessionsByTutor/:sendUnreserved", auth, async (req, res) => {
  try {
    let sessions = [];
    const sendUnreserved = req.params.sendUnreserved == "true";
    if (!sendUnreserved) {
      sessions = await TS.find({ tutor: req.user.id })
        .populate("tutor", ["username", "tutorInfo"])
        .populate("student", "username");
    } else {
      sessions = await TS.find({
        $and: [{ tutor: req.user.id }, { student: { $exists: false } }],
      })
        .populate("tutor", ["username", "tutorInfo"])
        .populate("student", "username");
    }

    res.json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// @route GET sessions/getAvailableSessionsWithTutor
// @desct Gets all sesions where a tutor is available
// @access public
router.get("/getAvailableSessionsWithTutor/:tutorId", async (req, res) => {
  try {
    const sessions = await TS.find({
      tutor: req.params.tutorId,
      student: { $exists: false },
    })
      .populate("tutor", ["username", "tutorInfo"])
      .populate("student", "username");
    res.json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// @route GET sessions/getSessionsByUser
// @desct Gets all sesions where auth user is student or tutor
// @access private
router.get("/getSessionsByUser", auth, async (req, res) => {
  try {
    const sessions = await TS.find({
      $or: [{ tutor: req.user.id }, { student: req.user.id }],
    })
      .populate("tutor", ["username", "tutorInfo"])
      .populate("student", "username");
    res.json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.post(
  "/createBatch",
  [auth, [check("sessions", "Insert array of sessions").isArray()]],
  async (req, res) => {
    let sessionsArray = req.body.sessions;
    let sessions = [];

    // Delete blocks of tutor
    await TS.deleteMany({
      $and: [{ tutor: req.user.id }, { student: { $exists: false } }],
    });

    // Add new blocks for tutor
    sessionsArray.forEach(async (session) => {
      const newSession = new TS({
        tutor: session.tutor,
        subjectName: session.subjectName,
        begins: session.begins,
        ends: session.ends,
      });
      await newSession.save();
      sessions.push(newSession);
    });

    res.status(200).json(sessions);
  }
);

module.exports = router;
