const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", { title: "add-home" });
};

exports.postAddHome = (req, res, next) => {
  console.log(req.body);
  const { houseName, location, price } = req.body;
  const home = new Home(houseName, location, price);

  home.save();

  // resigterHomes.push({ houseName: req.body.houseName });
  // console.log(resigterHomes);
  res.render("host/home-added", { title: "home-added" });
};

exports.getHome = (req, res, next) => {
  console.log("inside the user router");
  const resigterHomes = Home.fetchAll((resigterHomes) => {
    res.render("store/home", { resigterHomes: resigterHomes, title: "home" });
  });
  // res.sendFile(path.join(rootDir, "views", "home.html"));
};
