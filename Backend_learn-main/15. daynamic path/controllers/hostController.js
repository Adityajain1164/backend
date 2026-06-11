const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    }),
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = id;
  home.save();

  res.redirect("/host/host-home-list");
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  console.log(homeId, editing);
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("home not found for editing");
      return res.redirect("/host-home-list");
    }
    console.log(homeId, editing, home);

    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "addHome",
      editing: editing,
    });
  });
};

exports.postDeletehost = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(homeId, "in post delete host");
  Home.deleteById(homeId, (err) => {
    if (err) {
      console.log("error while deleting", err);
    }
    res.redirect("/host/host-home-list");
  });
};
