import { Router } from "express";
import authRouter from "./auth.mjs";
import userRouter from "./user.mjs";
import secretsRouter from "./secrets.mjs";

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(secretsRouter);

export default router;
