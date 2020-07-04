import express from "express";

import {
    getServers,
    getServer,
    createServer,
    joinServer,
    createCategory,
    createChannel,
    joinChannel,
} from "../controllers/ServerController";

const router = express.Router();

router.get("/", getServers);
router.post("/", createServer);
router.get("/:serverId", getServer);
router.post("/:serverId/join", joinServer);
router.post("/:serverId/createcategory", createCategory);
router.post("/:serverId/:categoryId/createchannel", createChannel);
router.get("/:serverId/:categoryId/joinchannel", joinChannel);

export { router as ServerRoutes };
