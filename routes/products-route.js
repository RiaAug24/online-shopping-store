const express = require("express");
const products = require("../controllers/prod-ctrl");
const router = express.Router();

router.get("/products", products.getAllProducts);
router.get("/products/:id", products.getProductDetails);
module.exports = router;
