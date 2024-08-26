const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth-ctrl");

router.get("/signup", authController.getSignUpPage);
router.get("/login", authController.getLoginPage); 


module.exports = router;
