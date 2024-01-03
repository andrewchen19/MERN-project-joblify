const Joi = require("joi");

// 與 register 相關的操作，必須先通過此驗證
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
      "any.required": "Name must be provided",
      "string.empty": "Name can't be empty",
      "string.min": "Name should have a minimum length of {#limit} characters",
      "string.max": "Name should have a maximum length of {#limit} characters",
    }),
    // email() -> 必須是有效的 email 格式
    email: Joi.string().email().required().messages({
      "any.required": "Email must be provided",
      "string.empty": "Email can't be empty",
      "string.email": "Email must be a valid email address",
    }),
    password: Joi.string().required().min(5).messages({
      "any.required": "Password must be provided",
      "string.empty": "Password can't be empty",
      "string.min":
        "Password should have a minimum length of {#limit} characters",
    }),
  });

  return schema.validate(data);
};

// 與 login 相關的操作，必須先通過此驗證
// 這邊的 password 不用限定字數 (只是登入而已)
const loginValidation = (data) => {
  const schema = Joi.object({
    // email() -> 必須是有效的 email 格式
    email: Joi.string().email().required().messages({
      "any.required": "Email must be provided",
      "string.empty": "Email can't be empty",
      "string.email": "Email must be a valid email address",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password must be provided",
      "string.empty": "Password can't be empty",
    }),
  });

  return schema.validate(data);
};

// 與 updateUser 相關的操作，必須先通過此驗證
const updateUserValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
      "any.required": "Name must be provided",
      "string.empty": "Name can't be empty",
      "string.min": "Name should have a minimum length of {#limit} characters",
      "string.max": "Name should have a maximum length of {#limit} characters",
    }),
    // email() -> 必須是有效的 email 格式
    email: Joi.string().email().required().messages({
      "any.required": "Email must be provided",
      "string.empty": "Email can't be empty",
      "string.email": "Email must be a valid email address",
    }),
    lastName: Joi.string().max(20).default("lastName").messages({
      "string.empty": "Last name can't be empty",
      "string.max":
        "Last name should have a maximum length of {#limit} characters",
    }),
    location: Joi.string().max(20).default("my city").messages({
      "string.empty": "Location can't be empty",
      "string.max":
        "Location should have a maximum length of {#limit} characters",
    }),
  });

  return schema.validate(data);
};

// 與 job 相關的操作，必須先通過此驗證
const jobValidation = (data) => {
  const schema = Joi.object({
    company: Joi.string().max(50).required().messages({
      "any.required": "Company must be provided",
      "string.empty": "Company can't be empty",
      "string.max":
        "Company name should have a maximum length of {#limit} characters",
    }),
    position: Joi.string().max(100).required().messages({
      "any.required": "Position must be provided",
      "string.empty": "Position can't be empty",
      "string.max":
        "Position should have a maximum length of {#limit} characters",
    }),
    // valid() -> 代表只能從中選取
    status: Joi.string()
      .valid("interview", "declined", "pending")
      .default("pending")
      .messages({
        "any.only": "Status must choose from specified options",
      }),
    jobType: Joi.string()
      .valid("full-time", "part-time", "remote", "internship")
      .default("full-time")
      .messages({
        "any.only": "Job type must choose from specified options",
      }),
    jobLocation: Joi.string().default("my city").messages({
      "string.empty": "Job location can't be empty",
    }),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  jobValidation,
  updateUserValidation,
};
