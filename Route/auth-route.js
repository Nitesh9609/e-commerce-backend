const jwt = require("jsonwebtoken");
const userModel = require("../Model/UserModel/userModel");

exports.verified = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.send("access denied");
  try {
    const verified = jwt.verify(token, process.env.USER_KEY);
    req.user = await userModel.findById(verified._id);
    next();
  } catch (error) {
    res.send("invalid token");
  }
};

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          res.send("You are not authorized")
        );
      }
  
      next();
    };
  };
