// Authentication Route
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/User");

const dotenv = require("dotenv");
dotenv.config();

/**
 * Check if email is already registered
 *
 * @param {string} email
 *
 * @returns {boolean} true if email is already registered
 */
router.get("/user/exists/:email", (req, res) => {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (user) {
        res.status(200).send({ exists: true, user });
      } else {
        res.status(200).send({ exists: false });
      }
    }
  });
});

/**
 * Login user
 *
 * @param {string} email
 * @param {string} password
 *
 * @returns {User, token} User object and token
 */
router.post("/login", userMiddleware.loginUser, (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign(user._doc, process.env.JWT_SECRET);

    return res.status(200).json({
      ...user._doc,
      token: token,
    });
  });
});

/**
 * Register user
 *
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @param {string} nickname
 *
 * @returns {User, token} User object and token
 */
router.post("/user/create", userMiddleware.createUser, (req, res) => {
  const { name, password, email } = req.body;
  const user = new User({
    name: name,
    nickname: name.split(" ")[0],
    password: password,
    email: email,
  });

  user.save((err, result) => {
    if (err) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.json({
        result,
        token: jwt.sign(result._doc, process.env.JWT_SECRET),
      });
    }
  });
});

module.exports = router;
