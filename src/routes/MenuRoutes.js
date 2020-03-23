import express from "express";

import { getCategories, getProducts, addCategory, addProduct } from "../controllers/MenuController";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", addCategory);
router.get("/:category", getProducts);
router.post("/:category", addProduct);

export { router as MenuRoutes };
