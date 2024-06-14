const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, new_password, reset_code } = req.body;

  // validations
  if (!email) throw "Email is required!";
  if (!new_password) throw "New Password is required!";
  if (!reset_code) throw "reset_code is required!";
  if (new_password.length < 5)
    throw "Password should be atleast 5 character long!";

  // Database Parse
  const getResetCode = await userModel.findOne({
    email: email,
    reset_code: reset_code,
  });

  if (!getResetCode) throw "Reset Code does not match!";

  const hashedPassword = await bcrypt.hash(new_password, 13);

  await userModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      reset_code: "",
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Password Reset Successfull!",
  });
};

module.exports = resetPassword;
