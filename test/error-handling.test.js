import express from "express";
import request from "supertest";

const app = express();

// Error-Handling Middleware
const errorMiddleware = (err, req, res, next) => {
  res.status(500).send(`Terjadi Error: ${err.message}`);
};

// Routing
app.get("/", (req, res) => {
  throw new Error("Ups");
});

// Middleware ini menerima parameter err, dan mengirimkan response:
// Status code: 500
// Body: "Terjadi Error: Ups"
app.use(errorMiddleware); // menggunakan middleware diposisi paling akhir, Letaknya penting: harus setelah semua route lain.

test("Test Response", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("Terjadi Error: Ups");
});
