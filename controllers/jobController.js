const Job = require("../models/Job");

const { jobValidation } = require("../validation");

const mongoose = require("mongoose");
const dayjs = require("dayjs");

const getAllJobs = async (req, res) => {
  try {
    const { search, status, jobType, sort } = req.query;

    // 限制使用者只能查看自己所新增的 job
    let queryObject = {
      createdBy: req.user.userId,
    };

    // search 的部分
    if (search) {
      // $regex -> Selects documents where values match a specified regular expression (使用者不用輸入完整的名稱)
      // $options: 'i' -> Case insensitivity to match upper and lower cases
      // position -> 在這是指 position field
      queryObject.position = { $regex: search, $options: "i" };
    }

    // status 的部分
    if (status === "interview") {
      queryObject.status = "interview";
    }
    if (status === "declined") {
      queryObject.status = "declined";
    }
    if (status === "pending") {
      queryObject.status = "pending";
    }

    // jobType 的部分
    if (jobType === "full-time") {
      queryObject.jobType = "full-time";
    }
    if (jobType === "part-time") {
      queryObject.jobType = "part-time";
    }
    if (jobType === "remote") {
      queryObject.jobType = "remote";
    }
    if (jobType === "internship") {
      queryObject.jobType = "internship";
    }

    // thenable object，提供 method chaining (記得把 await 拿掉)
    let result = Job.find(queryObject);

    // sort 的部分
    if (sort === "latest") {
      // descending
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      // ascending
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      // ascending
      result = result.sort("position");
    }
    if (sort === "z-a") {
      // descending
      result = result.sort("-position");
    }

    // skip() & limit()  -> use for pagination functionality
    // query string 的 type 都是 String (記得轉換 type)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    // documents that we will send back
    const jobs = await result;

    // count all documents
    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(200).json({ jobs, totalJobs, numOfPages });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getJob = async (req, res) => {
  const { _id } = req.params;

  try {
    // retrieve "name" field from "User" collection (createdBy field is a reference to the User model)
    const job = await Job.findOne({ _id, createdBy: req.user.userId }).populate(
      "createdBy",
      ["name"]
    );

    if (!job) {
      return res.status(404).json({ msg: `No job with id: ${_id}` });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      // Not Found
      return res.status(404).json({ msg: `No job with id: ${_id}` });
    } else {
      res.status(500).json({ error });
    }
  }
};

const createJob = async (req, res) => {
  // 檢查每個欄位是否格式都正確
  const { error } = jobValidation(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  // 檢查是否為 "demo user"
  if (req.user.userId === "658bb4ec5dd63da56cfb3f83") {
    return res.status(400).json({ msg: "Demo User. Read only!" });
  }

  try {
    // 記得加上 CreatedBy 這個 field
    const job = await Job.create({ ...req.body, createdBy: req.user.userId });

    // Created
    res.status(201).json({ msg: "Create successful" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateJob = async (req, res) => {
  // 檢查每個欄位是否格式都正確
  const { error } = jobValidation(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  // 檢查是否為 "demo user"
  if (req.user.userId === "658bb4ec5dd63da56cfb3f83") {
    return res.status(400).json({ msg: "Demo User. Read only!" });
  }

  const { _id } = req.params;

  try {
    const job = await Job.findOneAndUpdate(
      { _id, createdBy: req.user.userId },
      req.body,
      // 這邊 runValidators 不用寫，上面已檢查
      { new: true }
    );

    if (!job) {
      // Not Found
      return res.status(404).json({ msg: `No job with id: ${_id}` });
    }

    res.status(200).json({ msg: "Update successful" });
  } catch (error) {
    if (error.name === "CastError") {
      // Not Found
      return res.status(404).json({ msg: `No job with id: ${_id}` });
    } else {
      res.status(500).json({ error });
    }
  }
};

const deleteJob = async (req, res) => {
  // 檢查是否為 "demo user"
  if (req.user.userId === "658bb4ec5dd63da56cfb3f83") {
    return res.status(400).json({ msg: "Demo User. Read only!" });
  }

  const { _id } = req.params;

  try {
    const job = await Job.findOneAndDelete({ _id, createdBy: req.user.userId });

    if (!job) {
      // Not Found
      return res.status(404).json({ msg: `No job with id: ${_id}` });
    }

    res.status(200).json({ msg: "Delete successful" });
  } catch (error) {
    if (error.name === "CastError") {
      // Not Found
      return res.status(404).json({ msg: `No job with id: ${_id}` });
    } else {
      res.status(500).json({ error });
    }
  }
};

const showStats = async (req, res) => {
  // aggregation pipeline
  let stats = await Job.aggregate([
    // Step 1：Filter Job collection's documents by createdBy field
    // we need pass an mongoose object (not just general string)
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    // Step 2：Group remaining documents by status field and calculate total quantity
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  // console.log(stats);

  // reduce() -> return the sum of all the elements in an array
  stats = stats.reduce((total, item) => {
    const { _id, count } = item;
    total[_id] = count;
    return total;
  }, {});
  // console.log(stats);

  const defaultStats = {
    interview: stats.interview || 0,
    pending: stats.pending || 0,
    declined: stats.declined || 0,
  };

  // aggregation pipeline
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    // Step 3：Sort documents by year & month in descending order
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    // Step 4：limit the number of documents we want
    { $limit: 6 },
  ]);
  // console.log(monthlyApplications);

  // map() -> return a new array
  monthlyApplications = monthlyApplications.map((item) => {
    const { _id, count } = item;
    const { year, month } = _id;

    const date = dayjs(`${year}-${month}`).format("MMM YYYY");

    return { date, count };
  });
  // console.log(monthlyApplications);

  // reverse()
  monthlyApplications = monthlyApplications.reverse();

  res.status(200).json({ defaultStats, monthlyApplications });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
};
