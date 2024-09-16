const express = require("express");

const router = express.Router();
const orderController = require("../controllers/orders-ctrl");

router.get("/", orderController.getOrder);
router.post("/", orderController.addOrder);
module.exports = router;
