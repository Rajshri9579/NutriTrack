import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


import router from './routes/userRoutes.js';




dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/auth", router); // ✅

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://rajshripatil19022006:8Git7aJoUoGtDNj3@cluster0.xh13jx9.mongodb.net/")
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
