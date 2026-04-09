import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";
import { clearAllProducts } from "../controller/clear.controller.js";

const router = express.Router();

router.get("/", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.delete("/", clearAllProducts); // Clear all products

export default router;