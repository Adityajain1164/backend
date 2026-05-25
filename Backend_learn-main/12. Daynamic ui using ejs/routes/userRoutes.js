//*core module
const path = require("path");

//* expernal modules
const express = require("express");
const userRouter = express.Router();

//* local modules
const rootDir = require("../utils/path");

userRouter.get("/", (req, res, next) => {
  console.log("inside the user router");

  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = userRouter;
