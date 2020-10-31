const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const TS = require("../../models/TutoringSession");

router.post(
  "/create",
  [
    auth,
    [
      check("tutor", "Favor de ingresar un tutor").exists(),
      check("begins", "Favor de incluir hora de inicio").exists(),
      check("subject", "Favor de incluir la materia").exists(),
      check("minutestime", "Favor de incluir la duracion").exists(),
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
      const { tutor, begins, subject, minutestime } = req.body;
      const student = req.user.id;
      let newTS = new TS({
        tutor,
        student,
        begins,
        minutestime,
        subject,
      });

      try {
        await newTS.save();
        res.json(newTS);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Something went wrong with the DB, try again.");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route DELETE sessions/delete/:id
// @desct Delete tutoring session by id
// @access private
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const session = await TS.findById(req.params.id);
    const userId = req.user.id;

    if (userId !== session.tutor && userId !== session.student) {
      return res.status(403).send("Access Denied");
    }

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
    let session = await TS.findById(req.params.id);
    const userId = req.user.id;

    if (userId !== session.tutor && userId !== session.student) {
      return res.status(403).send("Access Denied");
    }

    session = await session.populate("tutor").populate("student");
    res.json(session);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
