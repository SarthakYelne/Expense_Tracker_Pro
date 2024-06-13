const express = require("express");
const auth = require("../../middlewares/auth");
const addIncome = require("./controllers/addIncome");

const transactionRoutes = express.Router();

transactionRoutes.use(auth);

// Routes
transactionRoutes.post("/addIncome", addIncome);

module.exports = transactionRoutes;
