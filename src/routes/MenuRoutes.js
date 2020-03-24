import express from "express";

import { getMenu, getProducts, addCategory, addProduct } from "../controllers/MenuController";

const router = express.Router();

router.get("/", getMenu);
router.post("/", addCategory);
router.get("/:category", getProducts);
router.post("/:category", addProduct);

export { router as MenuRoutes };
