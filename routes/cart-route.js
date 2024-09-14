const express = require("express");
const cartCtrl = require("../controllers/cart-ctrl");

const router = express.Router();

router.post("/items", cartCtrl.addItemToCart);

module.exports = router;


