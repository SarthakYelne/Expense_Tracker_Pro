const mongoose = require("mongoose");

const register = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { name, email, password, confirm_password, balance } = req.body;

  // Validations

  if (!name) throw "Name must be provided!";
  if (!email) throw "Email must be provided";
  if (!password) throw "Password must be provided!";
  if (password.length < 8) throw "Password must be at least 8 character long!";
  if (password !== confirm_password)
    throw "Password field does not match with Confirm password field!";

  const dupilcateEmail = await usersModel.findOne({
    email: email,
  });

  if (dupilcateEmail) throw "This email already exists!";

  await usersModel.create({
    name: name,
    email: email,
    password: password,
    balance: balance,
  });

  res.status(200).json({
    status: "User Registered Successfully!",
  });
};

module.exports = register;
