const express = require("express");
const router = express.Router();
const Subject = require("../../models/Subject");
const { check, validationResult } = require("express-validator/check");

// @route  GET api/subjects/getAll
// @desct  Get info of auth user
// @access Public/non-authentication/no-token
// Passing auth will execute the middleware function that will be executed before the callback.
// Given a JSON web token returns a user if the token is valid
router.get("/getAll", async (req, res) => {
  try {
    const subjects = await Subject.find({});
    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
