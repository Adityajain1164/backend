//*core module
const path = require("path");

//* expernal modules
const express = require("express");
const userRouter = express.Router();
const { resigterHomes } = require("./hostRouter");
const { title } = require("process");

//* local modules
// const rootDir = require("../utils/path");

userRouter.get("/", (req, res, next) => {
  console.log("inside the user router");

  // res.sendFile(path.join(rootDir, "views", "home.html"));
  res.render("home", { resigterHomes: resigterHomes, title: "home" });
});

module.exports = userRouter;
