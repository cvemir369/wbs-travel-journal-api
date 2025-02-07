import { Router } from "express";
import validateJOI from "../middlewares/validateJOI.js";
import { userSchema, signInSchema } from "../joi/schemas.js";
import { signUp, signIn, signOut } from "../controllers/auth.js";
import { auth } from "../middlewares/authMiddlewares.js";

const authRouter = Router();

authRouter.post("/signup", validateJOI(userSchema), signUp);
authRouter.post("/signin", validateJOI(signInSchema), signIn);
authRouter.route("/signout").post(signOut);
// authRouter.route("/me").get(getMe);

export default authRouter;
