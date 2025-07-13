const express = require("express");
const { askController } = require("./controller");

const llmRouter = express.Router();

llmRouter.post("/", askController);

module.exports = { llmRouter };
