const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: String,
    address: String,
    riskAppetite: {
      type: String,
      enum: ["Low", "Medium", "High"],
    },
    investmentPreferences: [String],
    relationshipManager: String,
    joinedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("user", userSchema);

module.exports = { User };
