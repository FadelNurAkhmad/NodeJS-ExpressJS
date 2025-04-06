import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("CONTOHRAHASIA"));
app.use(express.json());

app.get("/", (req, res) => {
  const name = req.signedCookies["Login"]; // Membaca Signed Cookie, membaca Value dari Key : Login
  res.send(`Hello ${name}`);
});

// Setiap nilai Cookie akan ada Signature, dimana ketika nilai Cookie diubah, otomatis Signature tidak
// akan sama lagi, dan secara otomatis value Cookie tidak dianggap valid lagi
app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/", signed: true }); // Kode : Membuat Signed Cookie
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app)
    .get("/")
    .set(
      "Cookie",
      "Login=s%3AParjo.b1EuWj%2B9pIJwIYxHEyJovdjAD09aGhUq%2BESsyj5fpVA; Path=/"
    );
  expect(response.text).toBe("Hello Parjo");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "Parjo" });
  console.info(response.get("Set-Cookie"));
  expect(response.get("Set-Cookie").toString()).toContain("Parjo");
  expect(response.text).toBe("Hello Parjo");
});
