const { connectDB } = require("../../../drizzle/config.js");
const { assets } = require("../../../drizzle/schema.js");

const addAsset = async (req, res) => {
  try {
    const db = await connectDB();
    const data = req.body;

    await db.insert(assets).values({
      clientEmail: data.clientEmail,
      assetType: data.assetType,
      assetName: data.assetName,
      quantity: data.quantity,
      currentValue: data.currentValue,
      lastUpdated: new Date(data.lastUpdated),
    });

    res
      .status(201)
      .json({ isSuccess: true, message: "Asset added successfully" });
  } catch (err) {
    console.error("Error inserting asset:", err.message);
    res.status(500).json({ isSuccess: false, message: "Server Error" });
  }
};

const getAllAssets = async (req, res) => {
  try {
    const db = await connectDB();
    const assetList = await db.select().from(assets);

    res.status(200).json({ isSuccess: true, data: assetList });
  } catch (err) {
    console.error("Error fetching assets:", err.message);
    res.status(500).json({ isSuccess: false, message: "Server Error" });
  }
};

module.exports = { addAsset, getAllAssets };
