const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");

// schema 的部分
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    required: true,
    maxlength: 20,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Mongoose Middleware
// 當定義在 Schema 上，allows you to use the same logic for "all documents" of the model
// 第二個參數 -> function expression (才能使用 this 關鍵字)
userSchema.pre("save", async function (next) {
  // this 指向正在進行儲存的用戶資料，也就是一個 Mongoose document
  if (this.isNew || this.isModified("password")) {
    // 第二個參數 -> saltRounds
    let hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

// Instance Method
// 若我們希望某個 Model 所建立的實例 ( instance，也就是 document ) 都可以使用某個 method 時，可以將 method 定義在 Schema 上
userSchema.methods.comparePassword = async function (candidatePassword) {
  // 第二個參數是指 instance 儲存在資料庫的雜湊值
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// model 的部分
module.exports = mongoose.model("User", userSchema);
