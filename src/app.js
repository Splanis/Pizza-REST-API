import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Routers
import { AuthRoute } from "./routes/UserRoutes";

// Init
const app = express();
dotenv.config();

// Connect Database
mongoose
    .connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected..."))
    .catch(error => console.log(error));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Middlewares
app.use("/api/user", AuthRoute);

// Start
app.listen(process.env.LISTEN_PORT, () => console.log(`Server started at port ${process.env.LISTEN_PORT}...`));
