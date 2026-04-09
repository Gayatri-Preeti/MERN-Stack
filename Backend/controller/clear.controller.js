import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const clearAllProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    res.status(200).json({ 
      success: true, 
      message: `Deleted ${result.deletedCount} products from database`,
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    console.error("Error clearing products:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
