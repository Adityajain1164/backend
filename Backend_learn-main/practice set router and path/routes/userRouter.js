//* expernal modlule
const express = require("express");
const userRouter = express.Router();

//* core module
const path = require("path");

//* local module
const rootdir = require("../utils/path");

userRouter.use(express.urlencoded());

userRouter.get("/", (req, res, next) => {
  console.log("inside the home page");
  res.sendFile(path.join(rootdir, "views", "home.html"));
});

userRouter.get("/contact-us", (req, res, next) => {
  console.log("inside the contact us page");
  res.sendFile(path.join(rootdir, "views", "contactform.html"));
});

userRouter.post("/contact-us", (req, res, next) => {
  console.log("inside the post request");
  console.log(req.body);
  res.sendFile(path.join(rootdir, "views", "submited.html"));
});

userRouter.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootdir, "views", "404.html"));
});

module.exports = userRouter;
