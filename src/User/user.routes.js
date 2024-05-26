import { Router } from "express";
import { signin } from "./user.controllers.js";
import { signup } from "./user.controllers.js";

export const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);