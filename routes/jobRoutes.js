const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} = require("../controllers/jobController");

router.get("/", getAllJobs);
// 注意放置的位置
router.get("/stats", showStats);
router.get("/:_id", getJob);
router.post("/", createJob);
router.patch("/:_id", updateJob);
router.delete("/:_id", deleteJob);

module.exports = router;
