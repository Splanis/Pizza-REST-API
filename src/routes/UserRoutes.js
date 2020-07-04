import express from "express";

import {
    register,
    login,
    update,
    userProfile,
    userServers,
} from "../controllers/UserController";

const router = express.Router();

router.get("/:id", userProfile);
router.get("/:id/servers", userServers);
router.post("/register", register);
router.post("/login", login);
router.patch("/update", update);

export { router as UserRoutes };
