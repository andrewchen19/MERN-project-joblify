const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema 的部分
const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
      maxlength: 50,
    },
    position: {
      type: String,
      required: true,
      maxlength: 100,
    },
    // Mongoose replaces {VALUE} with the value being validated
    status: {
      type: String,
      enum: {
        values: ["interview", "declined", "pending"],
        message: "{VALUE} is not supported",
      },
      default: "interview",
    },
    jobType: {
      type: String,
      enum: {
        values: ["full-time", "part-time", "remote", "internship"],
        message: "{VALUE} is not supported",
      },
      default: "full-time",
    },
    jobLocation: {
      type: String,
      required: true,
      default: "my city",
    },
    // 這行代表 createdBy 的值，是來自於 mongoDB users collection 裡面的 primary key
    // 但還是要自行添加 (並非會自動儲存)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  // automatically generate createdAt and updatedAt fields for the document
  { timestamps: true }
);

// model 的部分
module.exports = mongoose.model("Job", jobSchema);
