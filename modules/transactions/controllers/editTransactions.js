const mongoose = require("mongoose");
const validator = require("validator");

const editTransactions = async (req, res) => {
  const { transaction_id, remarks } = req.body;

  if (!transaction_id) throw "Transaction id is required!";

  if (!validator.isMongoId(transaction_id.toString()))
    throw "Please provide a valid id";

  const transactionModel = mongoose.model("transactions");

  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!getTransaction) throw "Transaction not found!";

  await transactionModel.updateOne(
    {
      _id: transaction_id,
    },
    {
      remarks,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Edit of Transaction successfull!",
  });
};

module.exports = editTransactions;
