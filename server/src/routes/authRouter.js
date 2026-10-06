import { Router } from "express";
import { register, login, getCurrentUser,logout } from "../controllers/authController.js";
import { authenticate} from "../middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authenticate, getCurrentUser);
authRouter.post("/logout", authenticate, logout);

export default authRouter;