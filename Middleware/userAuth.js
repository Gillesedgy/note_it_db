//8 => checking for valid token
require("dotenv").config();
const jwt = require("jsonwebtoken");

//*
module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token"); //
    // const jwtToken = req.header.authorization; //
    console.log("TOKEN USER AUTHIRIZATION:", jwtToken);
    if (!jwtToken) {
      return res.status(403).json({ message: "You are not Authorized" });
    }
    // verify the token payload
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    req.user = payload.id; 

    next(); //
  } catch (error) {
    console.error(error.message);
    return res.status(403).json({ message: "You are not Authorized" });
  }
};
//*
