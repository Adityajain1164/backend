const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite((favourite) => {
    Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourite.includes(home.id),
      );
      res.render("store/favourite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const HomeId = req.params.homeID;
  console.log("inside the getHomeDetails", HomeId);
  Home.findById(HomeId).then(([homes]) => {
    //* if us id ka home mila hi nhi to
    const home = homes[0];
    if (!home) {
      res.redirect("/homes");
    } else {
      console.log("Home Details Found", home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home-detail",

        //* render is inside the callback because of asycn if we dont get home detail who can we render it
      });
    }
  });
};

exports.postAddToFavourite = (req, res, next) => {
  console.log("came to add to Favourite", req.body);
  Favourite.addToFavourite(req.body.id, (err) => {
    if (err) {
      console.log("error while marking favourite", err);
    }
  });
  res.redirect("/favourites"); //* by get request;
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while removing from Favourite", error);
    }
    res.redirect("/favourites");
  });
};
