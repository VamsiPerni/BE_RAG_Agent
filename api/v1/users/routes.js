const express = require("express");
const { createUserController, getAllUsers } = require("./controllers");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/", createUserController);

module.exports = {
  userRouter,
};
