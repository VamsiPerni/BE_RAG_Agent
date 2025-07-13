const express = require("express");
const { addAsset, getAllAssets } = require("./controllers");

const assetRouter = express.Router();

assetRouter.post("/", addAsset);
assetRouter.get("/", getAllAssets);

module.exports = { assetRouter };
