const express = require("express");
const adminCtrl = require("../controllers/admin-ctrl");
const uploadMiddleware = require("../middlewares/fileupload");
const router = express.Router();

router.get("/products", adminCtrl.getProducts);
router.get("/products/new", adminCtrl.getNewProduct);
router.post("/products", uploadMiddleware, adminCtrl.createNewProduct);
module.exports = router;
