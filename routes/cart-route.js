const express = require("express");
const cartCtrl = require("../controllers/cart-ctrl");

const router = express.Router();

router.get("/", cartCtrl.getCartPage);
router.post("/items", cartCtrl.addItemToCart);
router.patch("/items", cartCtrl.updateCartItem);
module.exports = router;
