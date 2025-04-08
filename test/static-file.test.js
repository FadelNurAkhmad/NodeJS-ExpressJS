import express from "express";
import request from "supertest";

const app = express();

// Middleware ini secara otomatis akan mencari file, jika file ada, maka akan dikembalikan file
// tersebut, jika tidak ada, maka akan dilanjutkan ke middleware atau route selanjutnya
// app.use(express.static(__dirname + "/static"));
app.use("/static", express.static(__dirname + "/static")); // Menggunakan Prefix Path

app.get("/", (req, res) => {
  res.send(`Hello Response`);
});

app.get("/contoh.txt", (req, res) => {
  res.send(`Hello Response`);
});

test("Test Static File", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello Response");
});

test("Test Static File /contoh.txt", async () => {
  const response = await request(app).get("/contoh.txt");
  expect(response.text).toContain("Hello Response");
});

// Kode : Static File Prefix
test("Test Static File /static/contoh.txt", async () => {
  const response = await request(app).get("/static/contoh.txt");
  expect(response.text).toContain("This is sample text");
});
