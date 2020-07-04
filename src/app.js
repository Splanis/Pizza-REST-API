import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routers
import { UserRoutes } from "./routes/UserRoutes";
import { ServerRoutes } from "./routes/ServerRoutes";

// Init App
const app = express();
dotenv.config();

// Connect Database
(async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected...");
    } catch (error) {
        console.log(error);
    }
})();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enabling Cors
app.use(cors({ origin: true }));

// Route Middlewares
app.use("/api/user", UserRoutes);
app.use("/api/servers", ServerRoutes);

// Start
app.listen(process.env.LISTEN_PORT || 3001, () =>
    console.log(
        `Server started at port ${
            process.env.LISTEN_PORT ? process.env.LISTEN_PORT : 3001
        }...`
    )
);
