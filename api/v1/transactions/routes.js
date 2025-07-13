const express = require("express");
const { addTransaction, getAllTransactions } = require("./controllers");

const transactionRouter = express.Router();

transactionRouter.post("/", addTransaction);
transactionRouter.get("/", getAllTransactions);

module.exports = { transactionRouter };
