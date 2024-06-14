const nodemailer = require("nodemailer");

const emailManager = async (to, text, html, subject) => {
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
    to: to,
    from: "info@expensetrackerpro.com",
    text: text,
    html: html,
    subject: subject,
  });
};

module.exports = emailManager;
