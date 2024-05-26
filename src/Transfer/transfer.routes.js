import { createTransferController } from "./transfer.controller.js";
import { Router } from "express";
import { auth } from "../middlewares/auth.js";

export const transferRouter = Router();

transferRouter.post("/:walletId", auth, createTransferController);