//* expernal modules
const express = require("express");
const userRouter = express.Router();

//* local modules
const { getHome } = require("../controller/home");

userRouter.get("/", getHome);

module.exports = userRouter;
