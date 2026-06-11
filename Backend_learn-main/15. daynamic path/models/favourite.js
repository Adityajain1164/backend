const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourite(homeID, callback) {
    Favourite.getFavourite((favourites) => {
      if (favourites.includes(homeID)) {
        callback("home is already marked as favourite");
        // console.log("home is already marked as favourite");
      } else {
        favourites.push(homeID);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourite(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      if (err) {
        return callback([]);
      }
      try {
        callback(JSON.parse(data));
      } catch (e) {
        callback([]); // handles empty or malformed JSON
      }
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getFavourite((homeIds) => {
      homeIds = homeIds.filter((homeId) => delHomeId !== homeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
    });
  }
};
