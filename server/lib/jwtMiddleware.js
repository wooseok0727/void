import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = {
      _id: decoded._id,
      username: decoded.username,
    };
    console.log("나 jwt미들웨어", decoded);
    return next();
  } catch (err) {
    return next();
  }
};

export default jwtMiddleware;
