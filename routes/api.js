import express from "express";
import { loginUser, registerUser } from "../controllers/auth.js";
import { Product } from '../models/Product.js';
import { verifyToken } from '../middleware/authMiddleware.js'; // Only verify token, no admin check
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store images in memory before upload

router.post("/login", loginUser);
router.post("/register", registerUser);

// Upload product images (Authenticated users)
router.post('/products/:id/upload', verifyToken, upload.single("image"), async (req, res) => {
  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "nursery_products" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              console.error("Cloudinary upload error:", error);
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);

    if (!result || !result.secure_url) {
      console.error("Cloudinary upload did not return a secure_url:", result);
      return res.status(500).json({ error: "Image upload failed: no URL returned" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $push: { images: result.secure_url } },
      { new: true }
    );

    if (!updatedProduct) {
      console.error("Product not found for ID:", req.params.id);
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, imageUrl: result.secure_url, product: updatedProduct });
  } catch (error) {
    console.error("Error uploading image or updating product:", error);
    res.status(500).json({ error: "Image upload failed", details: error.message });
  }
});

// GET all active not deleted products (public)
router.get('/products', async (req, res) => {
  try {
    const category = req.query.category;
    const filter = { active: true, deleted: false };
    if (category) filter.category = category;

    const products = await Product.find(filter).select("name category subcategory price images");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// POST new product (Authenticated users)
router.post('/products', verifyToken, async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      images: req.body.images || []
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({ error: "Invalid product data" });
  }
});

// PUT Update Product Images (Authenticated users)
router.put('/products/:id/images', verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { images: req.body.images },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product images:", error);
    res.status(400).json({ error: "Failed to update images" });
  }
});

// Soft delete product (Authenticated users)
router.delete('/products/:id', verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    res.json({ success: true, message: "Product marked as deleted", product: updatedProduct });
  } catch (error) {
    console.error("Error soft deleting product:", error);
    res.status(400).json({ error: "Failed to delete product" });
  }
});

export default router;
