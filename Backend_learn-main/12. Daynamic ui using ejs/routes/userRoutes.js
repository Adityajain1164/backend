//*core module
const path = require("path");

//* expernal modules
const express = require("express");
const userRouter = express.Router();

//* local modules
// const rootDir = require("../utils/path");
const { registeredHomes } = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  console.log("inside the user router");
  console.log(registeredHomes);

  // res.sendFile(path.join(rootDir, "views", "home.html"));

  res.render("home", {
    registeredHomes: registeredHomes,
    pageTitle: "airbnb Home",
  });
});

module.exports = userRouter;
