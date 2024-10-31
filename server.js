const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const songsRouter = require("./routes/songs");
const usersRouter = require("./routes/users");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("mongodb connection error:", error);
    process.exit(1);
  }
};

connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json()); // Middleware to parse JSON
app.use("/api/songs", songsRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Music player api is running");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
