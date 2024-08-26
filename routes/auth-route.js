const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth-ctrl");

router.get("/signup", authController.getSignUpPage());

module.exports = router;
