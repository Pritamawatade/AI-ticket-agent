import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);
const MONGO_URI =  process.env.MONGO_URI || "mongodb://localhost:27017/ai-ticket";
const app = express();
console.log(MONGO_URI);
app.use(cors());
app.use(express.json());
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
