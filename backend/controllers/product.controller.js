import Product from "../models/product.model.js";
import mongoose from "mongoose";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const isValidImageUrl = (image) => {
  try {
    const url = new URL(image);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get Products",
    });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    (image?.trim() && !isValidImageUrl(image)) ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid product data",
    });
  }

  const productImage = image?.trim() || DEFAULT_IMAGE;

  const newProduct = new Product({
    name: name.trim(),
    price,
    image: productImage,
  });

  try {
    await newProduct.save();

    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    (image?.trim() && !isValidImageUrl(image)) ||
    typeof price !== "number" ||
    !Number.isFinite(price) ||
    price < 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid product data",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  const productImage = image?.trim() || DEFAULT_IMAGE;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name.trim(),
          price,
          image: productImage,
        },
      },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
