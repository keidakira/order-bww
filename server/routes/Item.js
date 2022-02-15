/*
    TODO: Add admin auth to all API routes
    All routes for Item related will be here
*/

const express = require("express");
const router = express.Router();

const Item = require("../models/Item");
const itemMiddleware = require("../middleware/Item");
const MenuCategory = require("../models/MenuCategory");

/**
 * All available routes for items
 *
 * Base URL: /api/items
 *
 * Routes:
 * GET  /api/items/ - get all items
 * GET  /api/items/:id - get item by id
 * POST  /api/items/ - create new item
 * PUT  /api/items/:id - update item by id
 * DELETE  /api/items/:id - delete item by id
 */

/**
 * Get all items
 *
 * @param {string} id - item id
 *
 * @returns {Item} item
 */
router.get("/", async (request, response) => {
  const items = await Item.find();
  response.json(items);
});

/**
 * Get item by id
 *
 * @param {string} id - item id
 *
 * @returns {Item} item
 */
router.get("/:id", itemMiddleware.checkItemId, async (request, response) => {
  try {
    const item = await Item.findById(request.params.id);

    // If no item found with such id
    if (!item) {
      return response.status(404).json({ message: "Item not found" });
    }

    response.json(item);
  } catch (error) {
    response.status(404).json({ message: "Item not found" });
  }
});

/**
 * Create a new Item
 *
 * @param {string} title - item's title
 * @param {number} price - item's price
 * @param {string} image - item's image
 * @param {MenuCategory._id} category - item's category
 *
 * @returns {Item} - Item object
 */
router.post("/", itemMiddleware.createItem, async (request, response) => {
  const { title, price, image, category } = request.body;

  const newItem = await new Item({
    title,
    price,
    image,
    category,
  }).save();

  const res = await MenuCategory.findByIdAndUpdate(category, {
    $push: { items: newItem._id },
  });

  return response.json(newItem);
});

/**
 * Update an Item
 *
 * @param {string} id - item's _id
 * @param {string} title - item's title
 * @param {number} price - item's price
 * @param {string} image - item's image
 *
 * @returns {Item} - Item object
 */
router.put(
  "/:id",
  itemMiddleware.checkItemId,
  itemMiddleware.updateItem,
  async (request, response) => {
    const { title, price, image } = request.body;

    const updatedItem = await Item.findByIdAndUpdate(
      request.params.id,
      {
        title,
        price,
        image,
      },
      { new: true }
    );

    return response.json(updatedItem);
  }
);

/**
 * Delete an Item
 *
 * @param {string} id - item's _id
 *
 * @returns {Item} - Item object
 */
router.delete("/:id", itemMiddleware.checkItemId, async (request, response) => {
  const deletedItem = await Item.findByIdAndDelete(request.params.id);

  return response.json(deletedItem);
});

module.exports = router;
