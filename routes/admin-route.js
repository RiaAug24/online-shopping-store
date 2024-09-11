const express = require("express");
const adminCtrl = require("../controllers/admin-ctrl");
const uploadMiddleware = require("../middlewares/fileupload");
const router = express.Router();

router.get("/products", adminCtrl.getProducts);
router.get("/products/new", adminCtrl.getNewProduct);
router.post("/products", uploadMiddleware, adminCtrl.createNewProduct);
router.get("/products/:id", adminCtrl.getUpdateProduct);
router.post("/products/:id", uploadMiddleware, adminCtrl.updateProductDetails);
router.delete("/products/:id", adminCtrl.deleteProduct)
module.exports = router;
