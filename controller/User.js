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
    const user = await User.find(req.body);
    if (user.length > 0) {
      res.status(200).json({ success: true, data: user[0] });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const addUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ success: true, message: "User added successfully" });
  } catch (error) {
    if (error && error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists" });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getUsers, addUser, login };
