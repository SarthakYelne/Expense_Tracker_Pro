require("express-async-errors");

const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./models/modules/users/users.routes");

require("dotenv").config();

const app = express();
app.use(cors());

mongoose
  .connect(process.env.mongodb_connection, {})
  .then(() => {
    console.log("MongoDB connection successfull");
  })
  .catch(() => {
    console.log("MongoDB connection failed!!!");
  });
// Routes

app.get("/", (req, res) => {
  res.send("Hello App!!!");
});

// Database Models

require("./models/usersModel");

app.use(express.json());

// Routes

app.use("/api/users", userRoutes);

// Error Handler

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on localhost:3000");
});
