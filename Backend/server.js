import express from "express";
import dotenv from "dotenv";
import path from "path"
import cors from "cors";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import productRoutes from "./routes/product.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
  credentials: true
}));

const__dirname = path.resolve();
app.use(express.json()); // allows us to accecpt JSON data in the req.body

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production"){}

app.listen(PORT, ()=>{
    connectDB();
console.log("server started at  http://localhost:" + PORT);
});

