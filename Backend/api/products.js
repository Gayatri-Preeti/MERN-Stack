import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Product from "../models/product.model.js";

dotenv.config();

const router = express.Router();

// Enable CORS
router.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "https://mern-stack-zyyc.vercel.app"],
  credentials: true
}));

// Middleware
router.use(express.json());

// Connect to database
connectDB();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, price, image } = req.body;
    
    if (!name || !price || !image) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields" 
      });
    }

    const product = await Product.create({
      name,
      price,
      image
    });

    res.status(201).json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      id, 
      { name, price, image }, 
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Product deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete all products
router.delete("/", async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    res.status(200).json({ 
      success: true, 
      message: `Deleted ${result.deletedCount} products`,
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
