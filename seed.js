const { Restaurant } = require("./models");
const { seedRestaurant } = require("./seedData");
const db = require("./db/connection");

const syncSeed = async () => {
  await db.sync({ force: true });
  await Restaurant.bulkCreate(seedRestaurant);
};

module.exports = syncSeed;