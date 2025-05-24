const express = require("express");
const router = express.Router();
const { Restaurant } = require("../models/index");

// GET all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const restaurant = await Restaurant.findByPk(id);

    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST a new restaurant
// POST a new restaurant with server-side validation
router.post("/", async (req, res) => {
  const { name, location, cuisine } = req.body;

  // Validate required fields
  if (
    !name || typeof name !== "string" || name.trim() === "" ||
    !location || typeof location !== "string" || location.trim() === "" ||
    !cuisine || typeof cuisine !== "string" || cuisine.trim() === ""
  ) {
    return res.status(400).json({
      error: "Validation error: 'name', 'location', and 'cuisine' are required and must be non-empty strings."
    });
  }

  try {
    const restaurant = await Restaurant.create({ name, location, cuisine });
    const restaurants = await Restaurant.findAll();
    res.status(201).json(restaurants);
  } catch (error) {
    console.error("Error creating restaurant:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// PUT update a restaurant
router.put("/:id", async (req, res) => {
  await Restaurant.update(req.body, { where: { id: req.params.id } });
  const updated = await Restaurant.findByPk(req.params.id);
  res.json(updated);
});

// DELETE a restaurant
router.delete("/:id", async (req, res) => {
  await Restaurant.destroy({ where: { id: req.params.id } });
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

module.exports = router;