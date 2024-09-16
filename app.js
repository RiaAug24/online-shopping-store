const express = require("express");
const expressSession = require("express-session");
const path = require("path");
const csrf = require("csurf");
const createSessionConfig = require("./config/session-config");

const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const cartMiddleware = require("./middlewares/cart");
const validateAuthentication = require("./middlewares/validate-auth");
const db = require("./data/database");
const authRoutes = require("./routes/auth-route");
const productsRoutes = require("./routes/products-route");
const pageRoutes = require("./routes/pages-route");
const adminRoutes = require("./routes/admin-route");
const cartRoutes = require("./routes/cart-route");
const orderRoutes = require("./routes/orders-route");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(csrf());
app.use(validateAuthentication);
app.use(addCsrfTokenMiddleware);
app.use(cartMiddleware);

app.use(pageRoutes);
app.use(authRoutes); //Evaluates all the incoming request from the auth route
app.use(productsRoutes);
app.use("/admin", adminRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use((req, res) => {
  res.status(404).render("shared/404");
});

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("Failed to connect to the database");
    console.log(error);
  });
