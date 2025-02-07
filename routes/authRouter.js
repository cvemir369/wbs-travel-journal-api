import { Router } from "express";
import validateJOI from "../middlewares/validateJOI.js";
import { userSchema, signInSchema } from "../joi/schemas.js";
import { signup } from "../controllers/auth.js";

const authRouter = Router();

authRouter.route("/signup").post(validateJOI(userSchema), signup);
// authRouter.route("/signin").post(validateJOI(signInSchema), signin);
// authRouter.route("/signout").post(signOut);
// authRouter.route("/me").get(getMe);

export default authRouter;
