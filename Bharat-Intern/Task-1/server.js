// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/registration", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose schema
const userSchema = new mongoose.Schema({
  username: String,
  age: Number,
  gender: String,
  email: String,
  phone: String,
});

const User = mongoose.model("User", userSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

app.post("/signup", async (req, res) => {
  const { username, age, gender, email, phone } = req.body;

  const newUser = new User({ username, age, gender, email, phone });
  await newUser.save(); 

  res.send(`Congrats, ${username}! You are registered.`);
});

app.post("/signin", async (req, res) => {
  // Implement your sign-in logic here
  // You may want to check the username and password against the database
  res.send("Sign in logic will be implemented here.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
