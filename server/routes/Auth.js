// Authentication Route
const express = require("express");
const router = express.Router();

const User = require("../models/User");

// User exists
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

// Login Route
router.post("/login", (req, res) => {
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
    const token = "fake-jwt-token";
    return res.status(200).json({
      ...user._doc,
      token: token,
    });
  });
});

// Signup Route
router.post("/user/create", (req, res) => {
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
      res.json({ result, token: "fake-jwt-token" });
    }
  });
});

module.exports = router;
