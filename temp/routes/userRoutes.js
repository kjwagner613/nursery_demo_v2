import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const secret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ firstName, lastName, email, password: hashedPassword });

  await newUser.save();
  const token = jwt.sign({ userId: newUser._id, email }, secret, { expiresIn: "1h" });
  res.status(201).json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id, email }, secret, { expiresIn: "1h" });
  res.status(200).json({ token });
});

export default router;