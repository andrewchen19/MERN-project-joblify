const User = require("../models/User");

const { updateUserValidation } = require("../validation");

const { createPayload, attachCookieToResponse } = require("../utilize");

const getAllUsers = async (req, res) => {
  try {
    // method chaining (exclude password 這個欄位)
    const users = await User.find({ role: "user" }).select("-password");

    res.status(200).json({ users, count: users.length });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const showCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const updateUser = async (req, res) => {
  // 檢查每個欄位是否格式都正確
  const { error } = updateUserValidation(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  // 檢查是否為 "demo user"
  if (req.user.userId === "658bb4ec5dd63da56cfb3f83") {
    return res.status(400).json({ msg: "Demo User. Read only!" });
  }

  const { name, email, lastName, location } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { name, email, lastName, location },
      // 這邊 runValidators 不用寫，上面已檢查
      { new: true }
    );

    // recreate token & cookie (因為 name 可能有所更動)
    const payload = createPayload(user);
    attachCookieToResponse({ res, payload });

    // 回傳給前端只需要回傳 user 的部分資料即可
    const userData = {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
    };

    res.status(200).json({ msg: "Update successful", user: userData });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getAllUsers,
  showCurrentUser,
  updateUser,
};
