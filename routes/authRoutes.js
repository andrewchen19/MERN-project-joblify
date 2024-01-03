const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/authController");

const { authenticateUser } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticateUser, logout);

module.exports = router;
