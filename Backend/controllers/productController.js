

// // fuction for add products

// const addproduct = async (req,res) =>{

// } 

// // fuction for list products

// const listProducts = async (req,res) =>{

// } 

// // fuction for edite products

// const editProducts = async (req,res) =>{

// } 

// // fuction for removing products

// const removeProduct = async (req,res) =>{

// } 

// // fuction for single product info

// const singleProduct = async (req,res) =>{

// } 

// export {listProducts,addproduct,removeProduct,singleProduct,editProducts}



import productModel from "../models/productModel.js";

// ADD PRODUCT
export const addproduct = async (req, res) => {
    try {
        const data = req.body;

        const newProduct = new productModel(data);
        await newProduct.save();

        res.json({ success: true, message: "Product added successfully", product: newProduct });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// LIST ALL PRODUCTS
export const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// EDIT PRODUCT
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


// REMOVE PRODUCT
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


// SINGLE PRODUCT INFO
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
