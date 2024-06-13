const express = require("express");
const auth = require("../../middlewares/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTransactions = require("./controllers/getTransactions");

const transactionRoutes = express.Router();

transactionRoutes.use(auth);

// Routes
transactionRoutes.post("/addIncome", addIncome);
transactionRoutes.post("/addExpense", addExpense);
transactionRoutes.get("/", getTransactions);

module.exports = transactionRoutes;
