import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/ai-ticket";

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Starting server");
        console.log("Connected to MongoDB");
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
