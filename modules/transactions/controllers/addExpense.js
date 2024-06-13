const mongoose = require("mongoose");
const validator = require("validator");
const userModel = require("../../../models/usersModel");

const addExpense = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  if (!amount) throw "Amount is required!";
  if (!remarks) throw "Remarks is required!";

  if (remarks.length < 5)
    throw "Remarks length should be atleast 5 characters long!";

  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a vaild number!";

  if (amount < 0) throw "Amount must not be neagtive!";

  await transactionModel.create({
    user_id: req.user._id,
    amount: amount,
    remarks: remarks,
    transaction_type: "expense",
  });

  await userModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount * -1,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Expense added successfully!",
  });
};

module.exports = addExpense;
