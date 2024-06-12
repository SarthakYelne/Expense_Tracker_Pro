require("express-async-errors");

const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/errorHandler");

const app = express();
app.use(cors());

// Routes 

app.get("/", (req, res) => {
  res.send("Hello App!!!");
});



app.use(express.json());

// Error Handler

app.use(errorHandler)



app.listen(3000, () => {
  console.log("Server running on localhost:3000");
});
