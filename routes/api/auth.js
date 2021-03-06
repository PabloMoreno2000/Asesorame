const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// @route  GET api/auth
// @desct  Get info of auth user
// @access Public/non-authentication/no-token
// Passing auth will execute the middleware function that will be executed before the callback.
// Given a JSON web token returns a user if the token is valid
router.get("/", auth, async (req, res) => {
  try {
    // The middleware auth modifies the request to have the user id if it has a correct token in the header
    // Do not pass the password.
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desct  Authenticate user & get token
// @access Public/non-authentication/no-token
router.post(
  "/",
  [
    check("username", "Favor de ingresar su usuario").exists(),
    check("password", "Favor de ingresar su contraseña").exists(),
  ],
  async (req, res) => {
    // The check is done with the second parameter of above within []
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { username, password } = req.body;

    try {
      // If there's a user with that email
      let user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Check if the hash version of a non-encrypted text equals to a hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

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
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
