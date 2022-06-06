const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const headers = req.headers;
  //   console.log(headers);
  let token = headers["authorization"];

  //   console.log(token);
  if (!token) {
    return res.status(401).json({ error: { message: "Access Denied" } });
  }
  token = token.split(" ")[1];
  try {
    const payload = await jwt.verify(token, "my secret");
    req.user = payload;
    console.log("req user", req.user);
    next();
  } catch (err) {
    return res.status(403).json({ error: { message: "Invalid token" } });
  }
};

module.exports = verifyToken;
