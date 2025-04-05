import express from "express";
import request from "supertest";

const app = express();

const router = express.Router(); // Router-Level Middleware
// Middleware
router.use((req, res, next) => {
  console.info(`Receive request : ${req.originalUrl}`);
  next();
});

// Promise
router.get("/feature/a", (req, res) => {
  res.send("feature a");
});

test("Test Router Disabled", async () => {
  const response = await request(app).get("/feature/a");
  expect(response.status).toBe(404);
});

test("Test Router Enabled", async () => {
  app.use(router); // app.use() untuk menggunakan middleware

  const response = await request(app).get("/feature/a");
  expect(response.text).toBe("feature a");
});
