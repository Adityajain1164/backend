//* core module
const path = require("path");
//*external module
const express = require("express");
const hostRouter = express.Router();

//* local module;
const rootDir = require("../utils/path");
const { title } = require("process");

hostRouter.get("/add-home", (req, res, next) => {
  res.render("add-home", { title: "add-home" });
});

const resigterHomes = [];
hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  resigterHomes.push({ houseName: req.body.houseName });
  console.log(resigterHomes);
  res.render("home-added", { title: "home-added" });
});

exports.hostRouter = hostRouter;
exports.resigterHomes = resigterHomes;
