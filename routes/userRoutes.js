const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  showCurrentUser,
  updateUser,
} = require("../controllers/userController");

const { authorizeRoles } = require("../middleware/auth");

router.get("/", authorizeRoles("admin"), getAllUsers);
router.get("/currentUser", showCurrentUser);
router.patch("/updateUser", updateUser);

module.exports = router;
