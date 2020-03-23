import Joi from "@hapi/joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/UserModel";

// Register

// Schema
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
        .required(),
    phone: Joi.string()
        .min(10)
        .required(),
    postal_code: Joi.string().required(),
    address: Joi.string().required(),
    name: Joi.string().required(),
    floor: Joi.string().required(),
    doorbell: Joi.string().required()
});

export const register = async (req, res) => {
    const { username, email, password, address, phone, postal_code, floor, doorbell, name } = req.body;

    const { error } = registerSchema.validate({ username, email, password, address, phone, postal_code, floor, doorbell, name });
    if (error) return res.status(400).json({ error_message: error.details[0].message });

    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ error_message: "Email is already in use" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        address: address,
        phone: phone,
        postal_code: postal_code,
        floor: floor,
        doorbell: doorbell,
        name: name
    });

    try {
        await user.save();

        const newUser = await User.findOne({ email });
        const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET_KEY);

        res.status(200)
            .header("auth_token", token)
            .json({
                message: "Success Login",
                userProfile: {
                    username: user.username,
                    email: user.email,
                    address: user.address,
                    postal_code: user.postal_code,
                    doorbell: user.doorbell,
                    floor: user.floor,
                    phone: user.phone,
                    name: user.name
                }
            });
    } catch (error) {
        res.status(400).json(error);
    }
};

// Login

// Schema
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

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error_message: "Email or password is wrong" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error_message: "Email or password is wrong" });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY);

    res.status(200)
        .header("auth_token", token)
        .json({
            message: "Success Login",
            userProfile: {
                id: user._id,
                username: user.username,
                email: user.email,
                address: user.address,
                postal_code: user.postal_code,
                doorbell: user.doorbell,
                floor: user.floor,
                phone: user.phone,
                name: user.name
            }
        });
};

export const update = (req, res) => {
    // User.update({ _id: req.body._id }).then(user => {
    //     if (!user) res.json({ success: false, error_message: "User not found" });
    //     user = new User(req.body);
    // });
    // user.save()
    //     .then(() => {
    //         res.json({ succes: true, message: "User Updated" });
    //     })
    //     .catch(error => {
    //         res.json({ success: false, result: error });
    //     });
};

// Do not need this for now
export const userProfile = async (req, res) => {
    // const userId = req.params.id;
    // try {
    //     user = User.findById(userId);
    // } catch (error) {
    //     res.json({ error_message: "User not found" });
    // }
};
