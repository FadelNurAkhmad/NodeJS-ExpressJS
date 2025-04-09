import express from "express";
import request from "supertest";
import mustacheExpress from "mustache-express";

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "html"); // menggunakan file .html di dalam folder /views
app.engine("html", mustacheExpress()); // use html in method mustache

app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello World",
    say: "This is a test",
  });
});
// index otomatis akan mencari file name index.html

test("Test Response", async () => {
  const response = await request(app).get("/");
  console.info(response.text);
  expect(response.text).toContain("Hello World");
  expect(response.text).toContain("This is a test");
});
