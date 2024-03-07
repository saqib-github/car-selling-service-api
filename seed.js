const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("./models");
const jwt = require("jsonwebtoken");

mongoose.connect(
  process.env.DATABASE_URL || "mongodb://localhost:27017/car-selling-app"
);

const insertUsers = async () => {
  const hashedPassword1 = await bcrypt.hash("123456abc", 10);

  const users = [{ email: "Amjad@desolint.com", password: hashedPassword1 }];

  await User.insertMany(
    users.map((user) => ({ ...user, email: user.email.toLowerCase() }))
  );
  console.log("Data inserted successfully");
};

insertUsers()
  .then(() => mongoose.connection.close())
  .catch((err) => {
    console.error("Error inserting data:", err);
    mongoose.connection.close();
  });
