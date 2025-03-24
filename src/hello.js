import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/parjo", (req, res) => {
  res.send("Hello Parjo");
});

app.listen(3000, () => {
  console.info("Server strated on port 3000");
});
