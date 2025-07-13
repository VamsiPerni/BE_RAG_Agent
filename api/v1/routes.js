const express = require("express");
const { userRouter } = require("./users/routes.js");
const { transactionRouter } = require("./transactions/routes.js");
const { assetRouter } = require("./assets/routes.js");
const { llmRouter } = require("./llm/routes.js");

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/transaction", transactionRouter);
apiRouter.use("/asset", assetRouter);
apiRouter.use("/llm", llmRouter);

module.exports = { apiRouter };
