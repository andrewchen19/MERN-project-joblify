const User = require("../models/User");

const { registerValidation, loginValidation } = require("../validation");

const { createPayload, attachCookieToResponse } = require("../utilize");

const register = async (req, res) => {
  // 檢查每個欄位是否格式都正確
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { name, email, password } = req.body;

  // check 此信箱是否註冊過
  const foundEmail = await User.findOne({ email });
  if (foundEmail) {
    // Conflict
    return res.status(409).json({ msg: "Email is already registered" });
  }

  // 如果是第一位註冊的使用者，將其身分變更成 admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  try {
    // 儲存前，會先進到 Mongoose Middleware
    await User.create({ name, email, password, role });

    // Created
    res.status(201).json({ msg: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  // 檢查每個欄位是否格式都正確
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const { email, password } = req.body;

  // check 是否有該用戶
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      msg: "User not found. Please double-check the email",
    });
  }

  // check 輸入的密碼是否儲存的雜湊值相同 (Instance Method)
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(401)
      .json({ msg: "Password incorrect. Please double-check the password" });
  }

  // create token & cookie
  const payload = createPayload(user);
  attachCookieToResponse({ res, payload });

  // 回傳給前端只需要回傳 user 的部分資料即可
  const userData = {
    name: user.name,
    email: user.email,
    lastName: user.lastName,
    location: user.location,
  };

  res.status(200).json({ msg: "Login Successful", user: userData });
};

const logout = async (req, res) => {
  // send cookie & expire immediately
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({ msg: "Logout Successful" });
};

module.exports = {
  register,
  login,
  logout,
};
