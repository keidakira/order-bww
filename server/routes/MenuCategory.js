/**
 * TODO: Add admin auth to all API routes
 * All routes for MenuCategory will be here
 */

const express = require("express");
const router = express.Router();

const MenuCategory = require("../models/MenuCategory");

/**
 * All available routes for MenuCategory
 * Base URL: /api/menu-categories
 *
 * Routes:
 * GET  /api/menu-categories/ - get all menu categories
 * GET  /api/menu-categories/:id - get menu category by id
 * POST  /api/menu-categories/ - create new menu category
 * PUT  /api/menu-categories/:id - update menu category by id
 * DELETE  /api/menu-categories/:id - delete menu category by id
 */

/**
 * Get all menu categories
 *
 * @returns [{MenuCategory}] array of menu categories
 */
router.get("/", async (request, response) => {
  const menuCategories = await MenuCategory.find({}).populate("items");

  response.json(menuCategories);
});

/**
 * Get menu category by id
 *
 * @param {string} id - menu category id
 *
 * @returns {MenuCategory} menu category
 */
router.get("/:id", async (request, response) => {
  try {
    const menuCategory = await MenuCategory.findById(request.params.id);

    // If no menu category found with such id
    if (!menuCategory) {
      return response.status(404).json({ message: "Menu category not found" });
    }

    response.json(menuCategory);
  } catch (error) {
    response.status(404).json({ message: "Menu category not found" });
  }
});

/**
 * Create a new MenuCategory
 *
 * @param {string} title - menu category title
 *
 * @returns {MenuCategory} menu category
 */
router.post("/", async (request, response) => {
  const menuCategory = new MenuCategory({
    name: request.body.name,
  });
  await menuCategory.save();
  response.json(menuCategory);
});

module.exports = router;
