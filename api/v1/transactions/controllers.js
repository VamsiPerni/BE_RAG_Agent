const { connectDB } = require("../../../drizzle/config.js");
const { transactions } = require("../../../drizzle/schema.js");

const addTransaction = async (req, res) => {
  try {
    const db = await connectDB();
    const data = req.body;

    try {
      await db.insert(transactions).values({
        clientEmail: data.clientEmail,
        instrument: data.instrument,
        amount: data.amount,
        transactionType: data.transactionType,
        transactionDate: new Date(data.transactionDate),
      });

      res.status(201).json({
        isSuccess: true,
        message: "Transaction added successfully",
      });
    } catch (err) {
      console.error("Insertion Failed:", err);
      res.status(500).json({
        isSuccess: false,
        message: `Insert failed , ${err.message}`,
      });
    }
  } catch (err) {
    console.error("Error inserting transaction:", err.message);
    res.status(500).json({
      isSuccess: false,
      message: "Server error",
    });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const db = await connectDB();
    const allTransactions = await db.select().from(transactions);

    res.status(200).json({
      isSuccess: true,
      message: "Fetched all transactions successfully",
      data: allTransactions,
    });
  } catch (err) {
    console.error("Error fetching transactions:", err.message);
    res.status(500).json({
      isSuccess: false,
      message: "Error fetching transactions",
    });
  }
};

module.exports = { addTransaction, getAllTransactions };
