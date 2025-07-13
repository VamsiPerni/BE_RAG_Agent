const {
  mysqlTable,
  int,
  varchar,
  double,
  datetime,
} = require("drizzle-orm/mysql-core");

const transactions = mysqlTable("transactions", {
  clientEmail: varchar("client_email", { length: 255 }),
  instrument: varchar("instrument", { length: 255 }),
  amount: double("amount"),
  transactionType: varchar("transaction_type", { length: 50 }),
  transactionDate: datetime("transaction_date"),
});

const assets = mysqlTable("assets", {
  clientEmail: varchar("client_email", { length: 255 }),
  assetType: varchar("asset_type", { length: 100 }),
  assetName: varchar("asset_name", { length: 255 }),
  quantity: double("quantity"),
  currentValue: double("current_value"),
  lastUpdated: datetime("last_updated"),
});

module.exports = { transactions, assets };
