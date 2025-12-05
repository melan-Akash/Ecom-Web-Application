import express from "express";
import upload from "../middleware/multer.js";

import {
    addproduct,
    listProducts,
    removeProduct,
    editProducts,
    singleProduct
} from "../controllers/productController.js";

const productRouter = express.Router();

// Upload 4 images
productRouter.post("/add",
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 }
    ]),
    addproduct
);

productRouter.post("/remove", removeProduct);
productRouter.post("/edit", editProducts);
productRouter.get("/list", listProducts);
productRouter.post("/info", singleProduct);

export default productRouter;
