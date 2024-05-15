// //8 => checking for valid token
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing Token" });
  }
  token = token?.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    req.user = user;
    next();
  });
};

module.exports = userAuth;
