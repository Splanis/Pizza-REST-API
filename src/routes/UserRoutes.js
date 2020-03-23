import express from "express";

import { register, login, update, userProfile } from "../controllers/UserController";

const router = express.Router();

router.get("/:id", userProfile);
router.post("/register", register);
router.post("/login", login);
router.patch("/update", update);

export { router as AuthRoutes };
