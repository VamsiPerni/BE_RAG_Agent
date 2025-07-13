const { drizzle } = require("drizzle-orm/mysql2");
const mysql = require("mysql2/promise");
const schema = require("./schema.js");

const dotEnv = require("dotenv");
dotEnv.config();

const connectDB = async () => {
  try {
    console.log("------Attempting to connect to MySQL with-----");

    const poolConnection = await mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    });

    console.log("----MYSQL DB CONNECTED SUCCESSFULLY----");

    const db = drizzle(poolConnection, { schema, mode: "default" });
    return db;
  } catch (err) {
    console.log("------ERROR WHILE CONNECTING TO MYSQL-----", err.message);
    throw err;
  }
};

module.exports = { connectDB };
