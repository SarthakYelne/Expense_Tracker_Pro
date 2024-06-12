const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const jwt_payload = jwt.verify(accessToken, process.env.jwt_access_key);

    req.user = jwt_payload;
  } catch (error) {
    res.status(401).json({
      status: "failed!",
      message: "Unauthorized!",
    });

    return;
  }
  next();
};

module.exports = auth;
