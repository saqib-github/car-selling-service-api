// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const { User, Car } = require("./models");
const { verifyToken } = require("./middlewares");

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = function (req, file, cb) {
  // Allow only images
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_secret_key_here",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update the car request endpoint to use multer
app.post(
  "/api/car-request",
  verifyToken,
  upload.array("images", 10),
  async (req, res) => {
    const { model, price, phone } = req.body;
    const images = req.files.map((file) => file.path);
    console.log(req.userId, "user");
    const userId = req.userId; // Assuming you have a middleware that adds the user object to the request

    // Validate request
    if (!model || !price || !phone || !images.length) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save car request to MongoDB
    try {
      const newCar = new Car({
        model,
        price,
        phone,
        images,
        userId,
      });

      await newCar.save();
      res.status(201).json({ message: "Car request saved successfully" });
    } catch (error) {
      console.error("Error saving car request:", error);
      res.status(500).json({ message: "Error saving car request" });
    }
  }
);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // MongoDB connection
  mongoose.connect(
    process.env.DATABASE_URL || "mongodb://localhost:27017/car-selling-app"
  );
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
});
