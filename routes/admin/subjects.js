const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Subject = require("../../models/Subject");

router.post(
  "/createAll",
  [check("subjects", "Insert array of subjects").isArray()],
  async (req, res) => {
    let subjectsArray = req.body.subjects;
    let subjects = [];

    subjectsArray.forEach(async (subject) => {
      const newSubject = new Subject({ name: subject });
      subjects.push(newSubject);
      await newSubject.save();
    });

    res.status(200).json(subjects);
  }
);

router.delete("/delete/:id", async (req, res) => {
  await Subject.findByIdAndRemove(req.params.id);
  res.send("Subject deleted");
});

module.exports = router;
