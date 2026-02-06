const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
app.use(express.json());
app.listen(5000, () => console.log("Server running on port 5000"));
