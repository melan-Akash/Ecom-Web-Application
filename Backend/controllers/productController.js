import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

// ----------------------- ADD PRODUCT -----------------------
export const addproduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            Category,
            subCategory,
            sizes,
            bestseller,
            date
        } = req.body;

        // Files from multer
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((img) => img);

        // Upload images to cloudinary
        let imagesUrl = await Promise.all(
            images.map(async (img) => {
                const upload = await cloudinary.uploader.upload(img.path, {
                    resource_type: "image",
                });
                return upload.secure_url;
            })
        );

        // Create product data
        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            Category,
            subCategory,
            sizes: JSON.parse(sizes), // because sizes come as string from form-data
            bestseller:bestseller == "true" ? true : false ,
            image:imagesUrl,
            date: Date.now(),
        };

        const newProduct = new productModel(productData);
        await newProduct.save();

        res.json({
            success: true,
            message: "Product added successfully",
            product: newProduct,
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};






// ----------------------- LIST ALL PRODUCTS -----------------------
export const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ----------------------- EDIT PRODUCT -----------------------
export const editProducts = async (req, res) => {
    try {
        const { id } = req.params;  // get ID from URL param
        let updateData = req.body;  // received updated data

        // If sizes come as JSON string
        if (updateData.sizes && typeof updateData.sizes === "string") {
            updateData.sizes = JSON.parse(updateData.sizes);
        }

        // If bestseller is string
        if (updateData.bestseller) {
            updateData.bestseller = updateData.bestseller === "true";
        }

        // If price comes as string
        if (updateData.price) {
            updateData.price = Number(updateData.price);
        }

        // Update product
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ----------------------- REMOVE PRODUCT -----------------------
export const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const deleted = await productModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// ----------------------- SINGLE PRODUCT -----------------------
export const singleProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const product = await productModel.findById(id);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
