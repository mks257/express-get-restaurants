// src/app.js
const express = require("express");
const app = express();
const { Restaurant } = require("../models/index");


app.use(express.json());
app.use(express.urlencoded({extended: true}));

// GET all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET restaurant by ID
app.get("/restaurants/:id", async (req, res) => {
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

app.post("/restaurants",async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.json(restaurant);
});
app.put("/restaurants/:id", async (req, res) => {
  const updatedRest = await Restaurant.update(req.body, {where: {id: req.params.id}});
  res.json(updatedRest);
});
app.delete("/restaurants/:id", async (req, res) =>{
  const deletedRest = await Restaurant.destroy({
    where: { id: req.params.id },
  });
  res.json(deletedRest);
});

module.exports = app;
