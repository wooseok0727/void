import jwt from "jsonwebtoken";
import User from "../models/user.js";

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = {
      _id: decoded._id,
      username: decoded.username,
    };

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      console.log(decoded.exp);
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      res.cookie("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      console.log(jwt.verify(token, process.env.JWT_SECRET).exp);
    }
    return next();
  } catch (err) {
    console.log(err);
    return next();
  }
};

export default jwtMiddleware;
