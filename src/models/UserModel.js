import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    floor: {
        type: String,
        required: true
    },
    doorbell: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("user", UserSchema);

export default User;
