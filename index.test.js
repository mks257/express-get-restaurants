const request = require("supertest");
const app = require("./src/app");
const { Restaurant } = require("./models");
const syncSeed = require("./seed.js");
let restQuantity;

beforeAll(async () => {
  await syncSeed();
  const restaurants = await Restaurant.findAll({});
  restQuantity = restaurants.length;
});

test("should return 200 on get", async () => {
  const response = await request(app).get("/restaurants");
  expect(response.statusCode).toEqual(200);
});

test("should return an array of restaurants", async () => {
  const response = await request(app).get("/restaurants");
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body[0]).toHaveProperty("cuisine");
});

test("should return the correct number of restaurants", async () => {
  const response = await request(app).get("/restaurants");
  expect(response.body.length).toEqual(restQuantity);
});

test("should return the correct restaurant data", async () => {
  const response = await request(app).get("/restaurants");
  expect(response.body).toContainEqual(
    expect.objectContaining({
      id: 1,
      name: "AppleBees",
      location: "Texas",
      cuisine: "FastFood",
    })
  );
});

test("should return correct restaurant", async () => {
  const response = await request(app).get("/restaurants/1");
  expect(response.body).toEqual(
    expect.objectContaining({
      id: 1,
      name: "AppleBees",
      location: "Texas",
      cuisine: "FastFood",
    })
  );
});

test("should return larger restaurant array", async () => {
  const response = await request(app)
    .post("/restaurants")
    .send({ name: "Desi District", location: "Texas", cuisine: "Indian" });
  const restaurants = await Restaurant.findAll();
  expect(restaurants.length).toEqual(restQuantity + 1);
});

test("should update first item in database", async () => {
  await request(app)
    .put("/restaurants/1")
    .send({ name: "Desi District", location: "Texas", cuisine: "Indian" });
  const restaurant = await Restaurant.findByPk(1);
  expect(restaurant.name).toEqual("Desi District");
});

test("should delete db entry by id", async () => {
  await request(app).delete("/restaurants/1");
  const restaurants = await Restaurant.findAll({});
  expect(restaurants.find((r) => r.id === 1)).toBeUndefined();
});