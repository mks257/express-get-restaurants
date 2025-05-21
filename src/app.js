const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll(); // Fetch all restaurants
    res.json(restaurants); // Send as JSON
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = app;
