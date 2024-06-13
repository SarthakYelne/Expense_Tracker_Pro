const mongoose = require("mongoose");
const validator = require("validator");
const userModel = require("../../../models/usersModel");

const addIncome = async (req, res) => {
  const usersModel = mongoose.model("users");
  const transactionModel = mongoose.model("transactions");

  const { amount, remarks } = req.body;

  if (!amount) throw "Amount is required!";
  if (!remarks) throw "Remarks is required!";

  if (remarks.length < 5)
    throw "Remarks length should be atleast 5 characters long!";

  if (!validator.isNumeric(amount.toString()))
    throw "Amount must be a vaild number!";

  const incomeAdded = await transactionModel.create({
    user_id: req.user._id,
    amount: amount,
    remarks: remarks,
    transaction_type: "income",
  });

  await userModel.updateOne(
    {
      _id: req.user._id,
    },{
        $inc: {
            balance: amount,
        },
    },
    {
      runValidators: true,
    }
  );
  
//   console.log(incomeAdded);

  res.status(200).json({
    status: "success",
    message: "Income added successfully!",
  });
};

module.exports = addIncome;
