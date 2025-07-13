const { User } = require("../../../models/user_schema");

const createUserController = async (req, res) => {
  try {
    const data = req.body;
    console.log("Creating user.....", data);

    Object.keys(data).forEach((key) => {
      if (data[key] == null || data[key] == "") {
        delete data;
      }
    });

    let newUser = null;

    try {
      newUser = await User.create(data);

      res.status(201);
      res.json({
        isSuccess: true,
        message: "User Created",
        data: newUser,
      });
    } catch (err) {
      console.log("Error while creating the user...", err.message);
      res.status(400).json({
        isSuccess: false,
        message: `Err:${err.message}`,
        data: {},
      });
    }
  } catch (err) {
    console.log("Error in create {userController}", err.message);
    res.status(500);
    res.json({
      isSuccess: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await User.find();

    res.status(200).json({
      isSuccess: true,
      message: "User data fetched Successfully",
      data: data,
    });
  } catch (err) {
    console.log("Error in {getAllUsers}....", err.message);
    res.status(501).json({
      isSuccess: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createUserController,
  getAllUsers,
};
