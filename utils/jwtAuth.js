const jwt = require("jsonwebtoken")

require("dotenv").config()

const { JWT_SECRET_KEY } = process.env

function jwtGenerator(userID) {
  const payload = {
    id: userID,
  }
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "24hr" })
}
module.exports = jwtGenerator
