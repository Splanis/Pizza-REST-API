import express from "express";

import { register, login, update } from "../controllers/UserController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/update", update);

export { router as AuthRoute };
