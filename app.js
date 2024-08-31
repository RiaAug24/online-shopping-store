const express = require("express");
const expressSession = require("express-session");
const path = require("path");
const csrf = require("csurf");
const createSessionConfig = require("./config/session-config");

const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const validateAuthentication = require("./middlewares/validate-auth");

const authRoutes = require("./routes/auth-route");
const productsRoutes = require("./routes/products-route");
const pageRoutes = require("./routes/pages-routes");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(csrf());
app.use(validateAuthentication);
app.use(addCsrfTokenMiddleware);
app.use(pageRoutes);
app.use(authRoutes); //Evaluates all the incoming request from the auth route
app.use(productsRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Failed to connect to the database");
    console.log(error);
  });
