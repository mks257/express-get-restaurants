const express = require("express");
const app = express();
const restaurantRoutes = require("../routes/restaurants");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the Express router for /restaurants
app.use("/restaurants", restaurantRoutes);

module.exports = app;