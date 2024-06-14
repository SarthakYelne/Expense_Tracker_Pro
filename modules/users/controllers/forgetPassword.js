const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const forgetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;

  const getUser = await usersModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist in the system";

  const resetPass = Math.floor(10000 + Math.random() * 90000);

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetPass,
    },
    {
      runValidators: true,
    }
  );

  // Nodemailer for sending emails and password resets
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "47a922284e2c41",
      pass: "91b85ab1b5b78f",
    },
  });

  transport.sendMail({
    to: email,
    from: "info@expensetrackerpro.com",
    text: "Your Password reset code : " + resetPass,
    html:
      "<h1>Your Password Reset Code!</h1> <br> <br> <h3>Reset Code :</h3><tr>" +
      resetPass,
    subject: "Reset Password - Expense Tracker Pro",
  });

  res.status(200).json({
    status: "success",
    message: "Reset code sent to email successfully!",
  });
};

module.exports = forgetPassword;
