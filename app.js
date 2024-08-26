const express = require("express");
const path = require("path");
const authRoutes = require("./routes/auth-route");
const db = require("./data/database");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(authRoutes); //Evaluates all the incoming request from the auth route

db.connectToDatabase().then(() => {
  app.listen(3000);
});
