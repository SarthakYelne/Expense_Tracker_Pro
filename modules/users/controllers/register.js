const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

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

  const hashedPassword = await bcrypt.hash(password, 13);

  const CreatedUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = await jsonwebtoken.sign(
    {
      _id: CreatedUser._id,
      name: CreatedUser.name,
    },
    process.env.jwt_access_key
  );

  res.status(200).json({
    status: "success",
    message: "User Registered Successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;
