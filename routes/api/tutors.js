const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Subject = require("../../models/Subject");
const { response } = require("express");

// @route  PUT tutors/makeTutor
// @desct  Makes the authenticated user a tutor
// @access private
// TODO: Put this in a try/catch
router.put(
  "/makeTutor",
  [
    auth,
    [
      check("firstName", "Favor de ingresar un nombre").exists(),
      check("firstSurname", "Favor de ingresar un primer apellido").exists(),
      check("secondSurname", "Favor de ingresar un segundo apellido").exists(),
      check("subjects", "Favor de ingresar un nombre").isArray(),
      check("schedule", "Favor de ingresar un nombre").exists(),
      check("tutoringLink", "Favor de ingresar un nombre").exists(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    let user = await User.findById(req.user.id);
    if (user.isTutor) {
      return res.status(403).send("Access Denied");
    }

    let {
      firstName,
      firstSurname,
      secondSurname,
      subjects,
      schedule,
      tutoringLink,
    } = req.body;

    subjects = subjects.map((subject) => {
      return mongoose.Types.ObjectId(subject);
    });

    const tutorInfo = {
      name: {
        firstName,
        firstSurname,
        secondSurname,
      },
      subjects,
      schedule,
      tutoringLink,
    };
    await User.findByIdAndUpdate(req.user.id, {
      tutorInfo,
      isTutor: true,
    });
    res.send("Done!");
  }
);

// @route  PUT tutors/updateSubjects
// @desct  Receives an array of subjects for the auth user
// @access private
router.put("/updateSubjects", auth, async (req, res) => {
  try {
    // Fetch user
    let user = await User.findById(req.user.id);

    // Check that user is tutor
    if (!user.isTutor) {
      return res.status(403).send("Access Denied");
    }

    // Update user
    let subjects = req.body.subjects;
    subjects = subjects.map((subject) => {
      return mongoose.Types.ObjectId(subject);
    });

    await User.findByIdAndUpdate(req.user.id, {
      "tutorInfo.subjects": subjects,
    });
    res.json("Done!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route  PUT tutors/updateSchedule
// @desct  Replace the schedule of the auth user
// @access private
router.put("/updateSchedule", auth, async (req, res) => {
  try {
    // Fetch user
    let user = await User.findById(req.user.id);

    // Check that user is tutor
    if (!user.isTutor) {
      return res.status(403).send("Access Denied");
    }

    // Update user
    let newSchedule = req.body.schedule;

    await User.findByIdAndUpdate(req.user.id, {
      "tutorInfo.schedule": newSchedule,
    });
    res.json("Done!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route  GET tutors/tutorDetails
// @desct Gets details of auth user who's a tutor
// @access public
router.get("/tutorDetails/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
      .populate("tutorInfo.subjects")
      .select("-password")
      .select("-username");

    if (!user.isTutor) {
      return res.status(403).send("Access Denied");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route  GET tutors/getAllBySubject
// @desct Gets info of tutors who give a certain subject
// @access public
router.get("/getAllBySubject/:subjectId", async (req, res) => {
  try {
    const tutors = await User.find({
      isTutor: true,
      "tutorInfo.subjects": req.params.subjectId,
    });
    res.json(tutors);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
