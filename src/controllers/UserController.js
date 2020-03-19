import Joi from "@hapi/joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/UserModel";

// Register
const registerSchema = Joi.object({
    username: Joi.string()
        .min(5)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required()
});

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    const { error } = registerSchema.validate({ username, email, password });
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    const emailExists = await UserModel.findOne({ email });
    if (emailExists) return res.status(400).json({ error_message: "Email is already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
        username: username,
        email: email,
        password: hashedPassword
    });

    try {
        await user.save();
        res.status(200).json({ message: "User Created" });
    } catch (error) {
        res.status(400).json(error);
    }
};

// Login
const loginSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required()
});

export const login = async (req, res) => {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ error_message: "Email or password is wrong" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error_message: "Email or password is wrong" });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY);
    res.status(200)
        .header("auth_token", token)
        .json({ message: "Succes Login" });
};

export const update = (req, res) => {
    // UserModel.update({ _id: req.body._id }).then(user => {
    //     if (!user) res.json({ success: false, error_message: "User not found" });
    //     user = new UserModel(req.body);
    // });
    // user.save()
    //     .then(() => {
    //         res.json({ succes: true, message: "User Updated" });
    //     })
    //     .catch(error => {
    //         res.json({ succes: false, result: error });
    //     });
};
