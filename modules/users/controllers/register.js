const mongoose = require("mongoose");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/email.Manager");

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

  const createdUser = await usersModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });

  const accessToken = jwtManager(createdUser);

  await emailManager(
    createdUser.email,
    "Welcome to the Expense Tracker Pro Web App!. Happy to onboard you to your personal expense tracking app for mananging expenses!!!",
    "<h1>Welcome to the Expense Tracker Pro Web App!</h1> <br> <br> <h3>Happy to onboard you to your personal expense tracking app for mananging expenses!!!</h3>",
    "Welcome to Expense Tracker Pro!"
  );

  res.status(200).json({
    status: "success",
    message: "User Registered Successfully!",
    accessToken: accessToken,
  });
};

module.exports = register;
