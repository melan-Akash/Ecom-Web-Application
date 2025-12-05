import productModel from "../models/productModel.js";

// ----------------------- ADD PRODUCT -----------------------
export const addproduct = async (req, res) => {
    try {
        const data = req.body;

        // images come from multer
        const files = req.files;

        const images = [
            files?.image1 ? files.image1[0].filename : null,
            files?.image2 ? files.image2[0].filename : null,
            files?.image3 ? files.image3[0].filename : null,
            files?.image4 ? files.image4[0].filename : null
        ].filter(Boolean);

        console.log(images);

        // data.image = images;

        const newProduct = new productModel(data);
        await newProduct.save();

        res.json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
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
        const { id, updateData } = req.body;

        const updated = await productModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updated) {
            return res.json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product updated", product: updated });
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
