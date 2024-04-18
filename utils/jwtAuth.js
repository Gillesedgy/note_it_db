const jwt = require("jsonwebtoken");

require("dotenv").config();

function jwtGenerator(userId) {
  const payload = {
    id: userId,
  };
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "24hr" });
}
module.exports = jwtGenerator;
