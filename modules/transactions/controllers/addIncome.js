const mongoose = require("mongoose");
const validator = require("validator");

const addIncome = (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  if (!amount) throw "Amount is required!";
  if (!remarks) throw "Remarks is required!";

  if (remarks.length < 5)
    throw "Remarks length should be atleast 5 characters long!";

  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a vaild number!";

  res.status(200).json({
    status: "success",
    message: "Income added successfully!",
  });
};

module.exports = addIncome;
