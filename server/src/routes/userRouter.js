import { Router } from "express";
import { getTechnicians } from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.get("/technicians", getTechnicians);

export default userRouter;
