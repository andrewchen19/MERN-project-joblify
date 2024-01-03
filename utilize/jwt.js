const jwt = require("jsonwebtoken");

const attachCookieToResponse = ({ res, payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    // ensures that the cookie is only accessible via HTTP requests
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // will be true if in production environment, ensure that the cookie is sent only over secure HTTPS connections
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};

module.exports = attachCookieToResponse;
