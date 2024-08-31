const express = require("express");

const router = express.Router();
const authController = require("../controllers/auth-ctrl");

//http Get methods
router.get("/signup", authController.getSignUpPage);
router.get("/login", authController.getLoginPage);

// http Post methods
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logoutUser)
module.exports = router;
