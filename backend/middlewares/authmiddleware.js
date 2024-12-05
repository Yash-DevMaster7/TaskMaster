require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"] || req.get("Authorization");
  if (!token) {
    return res.status(401).send({ message: "Unauthorized: Missing token" });
  }
  const decoded = jwt.verify(token, jwtsecret);
  if (!decoded) {
    return res.status(401).send({ message: "Unauthorized: Invalid token" });
  }
  req.id = decoded.id;
  next();
};
module.exports = {
  authMiddleware,
};
