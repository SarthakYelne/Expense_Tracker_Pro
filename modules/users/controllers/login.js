const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "This email does not exist in the system!";

  const CheckPassword = await bcrypt.compare(password, getUser.password);

  if (!CheckPassword) throw "Email and password does not match!";

  const accessToken = await jsonwebtoken.sign(
    {
      _id: getUser._id,
      name: getUser.name,
    },
    process.env.jwt_access_key
  );

  // success
  res.status(200).json({
    status: "success",
    message: "User Logged in Successfully!",
    accessToken: accessToken,
  });
};

module.exports = login;
