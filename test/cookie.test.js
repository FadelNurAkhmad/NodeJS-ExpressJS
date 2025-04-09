import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();

// Third-Party Middleware
app.use(cookieParser());

// Built-in Middleware adalah bawaan Express
app.use(express.json());

// Promisen atau routing
app.get("/", (req, res) => {
  const name = req.cookies["name"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/" });
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app)
    .get("/")
    .set("Cookie", "name=Parjo;author=Programmer Zaman Old");
  expect(response.text).toBe("Hello Parjo");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "Parjo" });
  expect(response.get("Set-Cookie").toString()).toBe("Login=Parjo; Path=/");
  expect(response.text).toBe("Hello Parjo");
});
