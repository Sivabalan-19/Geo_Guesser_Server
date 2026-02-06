const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.use("/users", require("./routes/User"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
