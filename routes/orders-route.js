const express = require("express");

const router = express.Router();
const orderController = require("../controllers/orders-ctrl");

router.get("/", orderController.getOrder);
router.post("/", orderController.addOrder);

router.get("/success", orderController.getSuccess);
router.get("/failure", orderController.getFailure);
module.exports = router;
