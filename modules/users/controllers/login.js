const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist in the system!";

  const CheckPassword = await bcrypt.compare(password, getUser.password);

  if (!CheckPassword) throw "Email and password does not match!";


// success
  res.status(200).json({
    status: "User Logged in Successfully!",
  });
};

module.exports = login;
