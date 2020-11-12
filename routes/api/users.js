const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// Returns a moongose model of the user
const User = require("../../models/User");

// @route POST api/user
// @desct Register user
// @access Public/non-authentication/no-token
router.post(
  "/",
  [
    // Second parameter of check is a custom error message
    // Checks for the value of a json key called "username"
    check("username", "Favor de ingresar un usuario").not().isEmpty(),
    check(
      "password",
      "Favor de ingresar una contraseña con mínimo 6 caracteres"
    ).isLength({ min: 6 }),
    check("firstName", "Favor de ingresar un nombre").not().isEmpty(),
    check("firstSurname", "Favor de ingresar un apellido").not().isEmpty(),
  ],
  async (req, res) => {
    // The check is done with the second parameter of above within []
    // Pass the request whose body has a json element
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { username, password, firstName, firstSurname } = req.body;

    try {
      // Check if there's a user with that username
      let userFound = await User.findOne({ username });
      if (userFound) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Create new user using mongoose model
      let user = new User({
        username,
        password,
        tutorInfo: {
          name: {
            firstName,
            firstSurname,
            secondSurname: "",
          },
        },
      });

      // 10 is recommended in documentation, the bigger the number means more security
      const salt = await bcrypt.genSalt(10);
      // Encrypt the password
      user.password = await bcrypt.hash(password, salt);
      // Remember that User is a moongose model and we connected moongose with our database
      await user.save();

      const payload = {
        user: {
          id: user.id, // Moongose gets the id of the database
        },
      };

      // Generate a JSON Web Token (encrypted payload with signature)
      jwt.sign(
        payload,
        config.get("jwtSecret"), // encryption key
        { expiresIn: 360000 },
        // Callback
        (err, token) => {
          // If there's an error, throw it
          if (err) throw err;
          // Else, set in the json of the response this web token with
          // the user id that can be used for authentication after sign up
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
