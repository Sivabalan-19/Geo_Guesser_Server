const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const secret = process.env.JWT_SECRET || "dev_secret";
    const token = jwt.sign({ userId: user._id, email: user.email }, secret, {
      expiresIn: "1d",
    });

    // Avoid sending password back
    const { password: _, ...safeUser } = user.toObject();
    res.status(200).json({ success: true, data: safeUser, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });
    res.status(201).json({ success: true, message: "User added successfully" });
  } catch (error) {
    console.log(error);
    if (error && error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getUsers, addUser, login };
