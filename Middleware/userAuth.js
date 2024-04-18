// //8 => checking for valid token
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing Token" });
  }
  token = token?.replace("Bearer ", "");

  console.log("token =", process.env.JWT_SECRET_KEY);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    console.log("error =", err);
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    console.log("user in middle = ", user);

    req.user = user;

    console.log("set user in middle = ", user);

    next();
  });
};

module.exports = userAuth;
