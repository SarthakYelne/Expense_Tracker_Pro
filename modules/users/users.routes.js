const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");

const userRoutes = express.Router();

// Routes

userRoutes.post("/register", register);
userRoutes.post("/login", login);

module.exports = userRoutes;
