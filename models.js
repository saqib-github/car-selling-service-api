const { default: mongoose } = require("mongoose");

// Define MongoDB Schema
const carSchema = new mongoose.Schema({
  model: String,
  price: Number,
  phone: String,
  images: [String],
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Car = mongoose.model("Car", carSchema);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = { Car, User };
