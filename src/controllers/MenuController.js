import { Product, Category } from "../models/MenuModel";

export const getMenu = async (req, res) => {
    try {
        const menu = await Category.find({});
        res.json(menu);
    } catch (error) {
        res.json({ error_message: error });
    }
};

export const addCategory = async (req, res) => {
    const { name, products } = req.body;

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) return res.status(400).json({ error_message: "Category already exists" });

    const category = new Category({
        name: name,
        products: products
    });

    try {
        await category.save();
        res.status(200).json({ message: `Category ${name} created` });
    } catch (error) {
        res.json({ error_message: error });
    }
};

export const getProducts = async (req, res) => {
    // TODO
    return;
};

export const addProduct = async (req, res) => {
    // TODO
    return;
};
