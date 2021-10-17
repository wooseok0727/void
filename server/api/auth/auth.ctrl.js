// AUTH CONTROLLER
import User from "../../models/user.js";
import Joi from "joi";

/*
    POST /api/auth/register
*/
export const register = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(5).max(20).required(),
  });

  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  const { username, password } = req.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      return res.sendStatus(409);
    }

    const user = new User({
      username,
    });
    await user.setPassword(password);
    await user.save();

    const token = user.generateToken();
    res
      .cookie("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .status(201)
      .send(user.serialize());
  } catch (err) {
    next(err);
  }
};

/*
    POST /api/auth/login
*/
export const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.sendStatus(401);
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.sendStatus(401);
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      return res.sendStatus(401);
    }
    const token = user.generateToken();
    res
      .cookie("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      })
      .send(user.serialize());
  } catch (err) {
    next(err);
  }
};

export const check = async (req, res, next) => {
  const { user } = res.locals;
  if (!user) {
    console.log("토큰없다요");
  }
  console.log("jwt미들웨어에서 여기왔다요", user);
};

export const logout = async (req, res, next) => {};
