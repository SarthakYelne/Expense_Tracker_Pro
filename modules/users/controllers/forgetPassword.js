const mongoose = require("mongoose");
const emailManager = require("../../../managers/email.Manager");

const forgetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;
  if (!email) throw "Email is required!";

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist in the system";

  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );

  await emailManager(
    email,
    "Your Password reset code : " + resetCode,
    "<h1>Your Password Reset Code!</h1> <br> <br> <h3>Reset Code :</h3><tr>" +
      resetCode,
    "Reset Password - Expense Tracker Pro"
  );

  res.status(200).json({
    status: "success",
    message: "Reset code sent to email successfully!",
  });
};

module.exports = forgetPassword;
