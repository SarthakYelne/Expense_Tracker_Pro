require("express-async-errors");

const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transactions/transactions.routes");

require("dotenv").config();

const app = express();
app.use(cors());
const port = 3000;

mongoose
  .connect(process.env.mongodb_connection, {})
  .then(() => {
    console.log("MongoDB connection successfull");
  })
  .catch(() => {
    console.log("MongoDB connection failed!!!");
  });
// Routes


// Database Models
require("./models/usersModel");
require("./models/transactionModel");

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>API Documentation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
          }
          h1 {
            color: #333;
          }
          h2 {
            color: #666;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            background: #fff;
            margin: 10px 0;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          strong {
            display: block;
            margin-bottom: 5px;
            font-size: 1.2em;
          }
          p {
            margin: 0;
          }
          code {
            display: block;
            background: #f4f4f4;
            padding: 10px;
            border: 1px solid #e1e1e1;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>Expense Tracker Pro API Documentation</h1>
        <h2>User Routes</h2>
        <ul>
          <li>
            <strong>POST: /api/users/register</strong>
            <p><br> - User Registration<code>curl -X POST http://localhost:${port}/api/users/register -d '{
    "name": "Sam",
    "password": "sam12345",
    "confirm_password": "sam12345",
    "email": "sam@gmail.com",
    "balance": 5000
}' -H 'Content-Type: application/json'</code></p>
          </li>
          <li>
            <strong>POST: /api/users/login</strong>
            <p><br> - User Login<code>curl -X POST http://localhost:${port}/api/users/login -d '{
    "email": "sam@gmail.com",
    "password": "sam12345"
}' -H 'Content-Type: application/json'</code></p>
          </li>
          <li>
            <strong>POST: /api/users/forgetPW</strong>
            <p><br> - Forget Password<code>curl -X POST http://localhost:${port}/api/users/forgetPW -d '{
    "email": "sam@gmail.com"
}' -H 'Content-Type: application/json'</code></p>
          </li>
          <li>
            <strong>POST: /api/users/resetPW</strong>
            <p><br> - Reset Password<code>curl -X POST http://localhost:${port}/api/users/resetPW -d '{
    "email": "sam@gmail.com",
    "new_password": "12345678",
    "reset_code": "xxxxxx"
}' -H 'Content-Type: application/json'</code></p>
          </li>
          <li>
            <strong>GET: /api/users/dashboard</strong>
            <p><br> - User Dashboard<code>curl -X GET http://localhost:${port}/api/users/dashboard</code></p>
          </li>
        </ul>
        <h2>Transaction Routes</h2>
        <ul>
          <li>
            <strong>POST: /api/transactions/addIncome</strong>
            <p><br> - Add Income<code>curl -X POST http://localhost:${port}/api/transactions/addIncome -d '{
    "amount": 3000,
    "remarks": "Investment return"
}' -H 'Content-Type: application/json'</code></p>
          </li>
          <li>
            <strong>POST: /api/transactions/addExpense</strong>
            <p><br> - Add Expense<code>curl -X POST http://localhost:${port}/api/transactions/addExpense -d '{
    "amount": 1000,
    "remarks": "Stocks"
}' -H 'Content-Type: application/json'</code></p>
          </li>
          <li>
            <strong>GET: /api/transactions</strong>
            <p><br> - Get Transactions<code>curl -X GET http://localhost:${port}/api/transactions</code></p>
          </li>
          <li>
            <strong>DELETE: /api/transactions/:transaction_id</strong>
            <p><br> - Delete Transaction<code>curl -X DELETE http://localhost:${port}/api/transactions/:transaction_id</code></p>
          </li>
          <li>
            <strong>PATCH: /api/transactions</strong>
            <p><br> - Edit Transaction<code>curl -X PATCH http://localhost:${port}/api/transactions -d '{
    "transaction_id": "1",
    "amount": 1500,
    "remarks": "Updated remarks"
}' -H 'Content-Type: application/json'</code></p>
          </li>
        </ul>
      </body>
    </html>
  `);
});

app.all("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: "Not Found!",
  });
});

// Error Handler
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server running on localhost:3000");
});
