import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Routers
import { AuthRoutes } from "./routes/UserRoutes";
import { MenuRoutes } from "./routes/MenuRoutes";

// Init App
const app = express();
dotenv.config();

// Connect Database
(async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("DB connected...");
    } catch (error) {
        console.log(error);
    }
})();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Middlewares
app.use("/api/user", AuthRoutes);
app.use("/api/menu", MenuRoutes);

// Start
app.listen(process.env.LISTEN_PORT || 3000, () => console.log(`Server started at port ${process.env.LISTEN_PORT}...`));
