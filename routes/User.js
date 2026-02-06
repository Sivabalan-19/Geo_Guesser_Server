const express = require("express");
const { getUsers, addUser, login } = require("../controller/User");

const router = express.Router();

router.get("/getuser", getUsers);
router.post("/adduser", addUser);
router.get("/login", login);

module.exports = router;
