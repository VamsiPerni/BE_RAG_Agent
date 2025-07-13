const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL, {
    dbName: "raw-agent",
  })
  .then(() => {
    console.log("------DB CONNECTED SUCCESSFULLY----");
  })
  .catch((err) => {
    console.log("Database Connection Error", err.message);
    console.log("------------------------");
  });
