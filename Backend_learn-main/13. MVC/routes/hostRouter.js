const express = require("express");
const hostRouter = express.Router();

//* local module;
const { getAddHome } = require("../controller/home");
const { postAddHome } = require("../controller/home");

// hostRouter.get("/add-home", (req, res, next) => {
//   res.render("add-home", { title: "add-home" });
// } );
//* have to shift the function which is handleing the request to controller

hostRouter.get("/add-home", getAddHome);

hostRouter.post("/add-home", postAddHome);

exports.hostRouter = hostRouter;
