import { Router } from "express";
import passport from "passport";
import "../strategies/localStrategy.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { userValidationSchema } from "../utils/validationSchemas.mjs";
import bcrypt from "bcrypt";
import { User } from "../mongoose/schema/userSchema.mjs";

const saltRounds = 10;
const router = Router();

router.post(
  "/api/auth/login",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login-failure",
    failureMessage: true,
  }),
  (req, res) => {
    return res.status(200).send({ message: "You are Logged In!" });
  }
);

router.get("/api/auth/login-failure", (req, res) => {
  return res.status(401).send({ message: req.session.messages });
});

router.post(
  "/api/auth/signup",
  checkSchema(userValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).send({ error: result.array() });
    try {
      const data = matchedData(req);
      const user = await User.findOne({ username: data.username });
      if (user) return res.status(401).send({ error: "User already Exist!" });
      bcrypt.hash(data.password, saltRounds, async (error, hash) => {
        if (error) return res.status(500).send({ error: error });
        data.password = hash;
        const createNewUser = await User.create(data);
        return res.status(201).send(createNewUser);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error });
    }
  }
);

router.get("/api/auth/status", (req, res) => {
  return req.user
    ? res.status(200).send({ user: req.user })
    : res.status(200).send({ message: "You are not Authenticated !" });
});

router.post("/api/auth/logout", (req, res) => {
  if (!req.user)
    return res.status(401).send({ error: "You are already Logged Out!" });
  req.logout((error) => {
    if (error) return res.status(400).send({ error: error });
    return res
      .status(200)
      .send({ message: "You are successfully logged out!" });
  });
});

export default router;
