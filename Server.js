const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/users", require("./routes/User"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
