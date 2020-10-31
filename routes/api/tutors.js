const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// TODO: Put this in a try/catch
router.put(
  "/makeTutor/:id",
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

    const {
      firstName,
      firstSurname,
      secondSurname,
      subjects,
      schedule,
      tutoringLink,
    } = req.body;

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
    await User.findByIdAndUpdate(req.params.id, {
      tutorInfo,
      isTutor: true,
    });
    res.send("Done!");
  }
);

module.exports = router;
