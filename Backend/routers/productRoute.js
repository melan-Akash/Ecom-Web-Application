import express from "express";
import {
    addproduct,
    listProducts,
    removeProduct,
    editProducts,
    singleProduct
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", addproduct);
productRouter.post("/remove", removeProduct);
productRouter.post("/edit", editProducts);
productRouter.get("/list", listProducts);
productRouter.post("/info", singleProduct);

export default productRouter;
