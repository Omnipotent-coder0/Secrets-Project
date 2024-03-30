import { Router } from "express";
import { Secret } from "../mongoose/schema/secretSchema.mjs";
import {
  body,
  checkSchema,
  matchedData,
  validationResult,
} from "express-validator";
import { secretValidationSchema } from "../utils/validationSchemas.mjs";

const router = Router();

router.get("/api/secrets", async (req, res) => {
  try {
    const secrets = await Secret.find({visibility : true});
    res.status(200).send(secrets);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
});

router.post(
  "/api/secrets",
  checkSchema(secretValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty) return res.status(400).send({ error: result.array() });
    try {
      const data = matchedData(req);
      const createNewSecret = await Secret.create(data);
      res.status(201).send(createNewSecret);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error });
    }
  }
);

// router.put("/api")

export default router;
