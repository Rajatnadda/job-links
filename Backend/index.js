import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import aplicationRoute from "./routes/application.route.js";
import path from "path";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // or "*" if testing
  credentials: true
}));
 

const PORT = process.env.PORT || 5002; // Or any other port you expect to be free

// apis
app.use("/api/users", userRoute);
app.use("/api/company", companyRoute); 
app.use("/api/job", jobRoute);
app.use("/api/application", aplicationRoute);
 

//-------------code for deployment----------------

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static( "./Frontend/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./Frontend/dist", "index.html"));
})


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
})}