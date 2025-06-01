import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // ✅ Ensure you have a User model
import dotenv from "dotenv";

dotenv.config();

// 🔹 REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    try {
      const existingUser = await User.findOne({ email})
      if (existingUser) return res.status(400).json({ message: "User already exists"})
    } catch (err) {
      res.status(500).json({ message: "Error finding existing user", error: err.message})
    }
    try {
      await newUser.save()
    } catch (err) {
      res.status(500).json({ message: "Error saving new user", error: err.message})
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token, user: { firstName, lastName, email } });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// 🔹 LOGIN USER

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Backend user before sending:", user); // ✅ Debug user data

    res.status(200).json({
      token,
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};