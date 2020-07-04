import mongoose, { Schema } from "mongoose";

const ServerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    isPrivate: {
        type: Boolean,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    photo: {
        type: String,
    },
    categories: [
        {
            name: {
                type: String,
                required: true,
            },
            channels: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    posts: [
                        {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: "Post",
                            default: [],
                        },
                    ],
                },
            ],
        },
    ],
    members: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    ],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

// const CategorySchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     channels: [
//         { type: mongoose.Schema.Types.ObjectId, ref: "Channel", default: [] },
//     ],
// });

// const ChannelSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }],
// });

const PostSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

export const Server = mongoose.model("Server", ServerSchema);
// export const Channel = mongoose.model("Channel", ChannelSchema);
// export const Category = mongoose.model("Category", CategorySchema);
export const Post = mongoose.model("Post", PostSchema);
