// Authentication Route
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const JWT = require("../helpers/JWT");
const userMiddleware = require("../middleware/User");
const Order = require("../models/Order");

const jwtHelper = new JWT();

/**
 * All available routes for items
 *
 * Base URL: /api/auth
 *
 * Routes:
 * POST  /api/auth/login - login user
 * POST  /api/auth/register - register user
 * GET  /api/auth/user/exists/:email - check if user exists
 */

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

    const token = jwtHelper.encode(user._doc);

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
 * @returns {...User, token} User object contents and token
 */
router.post("/register", userMiddleware.createUser, (req, res) => {
  const { name, password, email } = req.body;
  const user = new User({
    name: name,
    nickname: name.split(" ")[0],
    password: password,
    email: email,
  });

  user.save((err, user) => {
    if (err) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.json({
        ...user._doc,
        token: jwtHelper.encode(user._doc),
      });
    }
  });
});

/**
 * Get user orders
 *
 * @param {string} userToken
 *
 * @returns {Order[]} User orders
 */
router.get("/orders/:id", async (req, res) => {
  const user = req.params.id;
  const orders = await Order.find({ user: user })
    .populate("items.item paymentSession")
    .sort({ createdAt: -1 });

  res.status(200).json({
    orders,
  });
});

module.exports = router;
