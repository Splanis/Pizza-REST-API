import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    }
});

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [
        {
            type: ProductSchema,
            default: []
        }
    ]
});

export const Category = mongoose.model("Category", CategorySchema);
export const Product = mongoose.model("Product", ProductSchema);
