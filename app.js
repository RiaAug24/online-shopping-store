const express = require("express");
const path = require("path");

const db = require("./data/database");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

db.connectToDatabase().then(() => {
  app.listen(3000);
});
