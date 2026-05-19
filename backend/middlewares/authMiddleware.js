const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("AUTH:", req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: "No token" });
  }

  // Bearer token split
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Invalid token" });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (err) {
     console.log(err);
    return res
      .status(401)
      .json({ msg: "Token not valid" });

  }

};

module.exports = authMiddleware;