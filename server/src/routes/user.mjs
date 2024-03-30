import { Router } from "express";
import { User } from "../mongoose/schema/userSchema.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import {
  secretValidationSchema,
  userValidationSchema,
} from "../utils/validationSchemas.mjs";
import { Secret } from "../mongoose/schema/secretSchema.mjs";

const saltRounds = 10;

const router = Router();

router.get("/api/users", async (req, res) => {
  try {
    // const { user } = req;
    // if (user) return res.status(200).send(user);
    // return res.status(401).send({ message: "You are not Logged In!!" });
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
});

router.get("/api/users/secrets", async (req, res) => {
  const { user } = req;
  if (!user) return res.status(401).send({ error: "You are not Logged In!" });
  const secretsArray = [];
  for(const element of user.secrets){
    const secret = await Secret.findOne({ _id: element });
    secretsArray.push(secret);
  }
  console.log("array : ", secretsArray);
  return res.status(200).send({secrets : secretsArray});
});

router.post(
  "/api/users/secrets",
  checkSchema(secretValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    const { body } = req;
    if (!result.isEmpty())
      return res.status(401).send({ error: result.array() });
    if (!req.user) {
      return res.status(401).send({ error: "You are not Logged In!" });
    }
    try {
      const newSecret = await Secret.create(body);
      const user = new User(req.user);
      user.secrets.push(newSecret.id);
      const updatedUser = await user.save();
      return res.status(201).send(newSecret);
    } catch (error) {
      return res.status(401).send({ error: error });
    }
  }
);

router.put(
  "/api/users/secrets/:id",
  checkSchema(secretValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    const {
      params: { id },
      body: { title, description, visibility },
    } = req;
    if (!result.isEmpty())
      return res.status(401).send({ error: result.array() });
    if (!req.user)
      return res.status(401).send({ error: "You are not Logged In!" });
    try {
      const updatedSecret = await Secret.findByIdAndUpdate(
        id,
        { title, description, visibility },
        { new: true }
      );
      return res.status(200).send(updatedSecret);
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  }
);

router.delete("/api/users/secrets/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!req.user)
    return res.status(401).send({ error: "You are not Logged In!" });
  try {
    const findSecretId = req.user.secrets.find((secretId) => secretId == id);
    if (findSecretId) {
      const findDeletedSecret = await Secret.findByIdAndDelete({
        _id: findSecretId,
      });
      const updatedSecretArray = req.user.secrets.filter(
        (secretId) => secretId != findSecretId
      );
      const user = new User(req.user);
      user.secrets = updatedSecretArray;
      const updatedUser = await user.save();
      return res.status(200).send(findDeletedSecret);
    }
    return res.status(404).send({ error: "No secret with this id exist!" });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
});

router.delete("/api/users/", async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  if (!req.user)
    return res.status(401).send({ error: "You are not Logged In!" });
  try {
    req.logOut(async (error) => {
      if (error) return res.status(500).send({ error: error });
      const deletedUser = await User.findByIdAndDelete(user.id);
      return res.status(200).send(deletedUser);
    });
  } catch (error) {
    return res.status(500).send({ error: error });
  }
});

// router.post(
//   "/api/users",
//   checkSchema(userValidationSchema),
//   async (req, res) => {
//     const result = validationResult(req);
//     console.log(result);
//     if (!result.isEmpty())
//       return res.status(400).send({ error: result.array() });
//     try {
//       const data = matchedData(req);
//       const user = await User.findOne({ username: data.username });
//       if (user) return res.status(400).send({ error: "User already Exist!" });
//       bcypt.hash(data.password, saltRounds, async (error, hash) => {
//         data.password = hash;
//         const createNewUser = await User.create(data);
//         return res.status(201).send(createNewUser);
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ error: error });
//     }
//   }
// );

export default router;
