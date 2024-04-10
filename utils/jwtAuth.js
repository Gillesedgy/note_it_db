const jwt = require("jsonwebtoken")

require("dotenv").config()

const { JWT_SECRET_KEY } = process.env

function jwtGenerator(user_id) {
  const payload = {
    id: user_id,
  }
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "24hr" })
}
module.exports = jwtGenerator
