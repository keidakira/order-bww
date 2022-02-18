// DraftCart routes
const express = require("express");
const router = express.Router();

const userMiddleware = require("../middleware/User");

const DraftCartController = require("../controllers/DraftCart");

/**
 * All available routes for DraftCart
 *
 * Base URL: /api/draft-cart
 *
 * Routes:
 * POST  /api/draft-cart/ - create new draft-cart
 * GET  /api/draft-cart/ - get all draft-cart list
 * GET  /api/draft-cart/:id - get items in specific draft-cart
 * PUT  /api/draft-cart/:id - update draft-cart by id
 * DELETE  /api/draft-cart/:id - delete draft-cart by id
 */

/**
 * Create a new DraftCart
 *
 * @header {string} Authorization - JWT token
 * @param {Item} item - an item to add to cart initially
 *
 * @returns {DraftCart} draft-cart object
 */
router.post(
  "/",
  userMiddleware.validateJWT,
  DraftCartController.createDraftCart
);

/**
 * Get a user's DraftCart
 *
 * @header {string} Authorization - JWT token
 *
 * @returns {DraftCart} draft-cart object
 */
router.get("/", userMiddleware.validateJWT, DraftCartController.getDraftCart);

/**
 * Update a user's DraftCart
 *
 * @header {string} Authorization - JWT token
 * @param {string} id - item id that needs to be added/modified
 * @param {number} quantity - quantity of item to add
 *
 * @returns {DraftCart} draft-cart object
 */
router.put(
  "/",
  userMiddleware.validateJWT,
  DraftCartController.updateDraftCart
);

module.exports = router;
