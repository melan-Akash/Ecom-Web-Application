import mongoose from "mongoose";
import { data } from "react-router-dom";

const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description : {type:String, required:true},
    price: {type: Number, required:true},
    image: {type: Array, required:true},
    Category: {type:String , required:true},
    subCategory: {type:String , required:true},
    sizes: {type:Array, required:true},
    bestseller: {type:Boolean, required:true},
    date: {type:Number, required:true},

})

const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel;