const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const Favourite = require("./favourite");
const homeDataPath = path.join(rootDir, "data", "homes.json");
module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        //* edit home case
        registeredHomes = registeredHomes.map((home) => {
          if (home.id === this.id) {
            return this;
          }
          return home;
        });
      } else {
        //* add home case

        this.id = Math.random().toString();
        registeredHomes.push(this);
      }

      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (err) => {
        console.log("File writing Concluded", err);
        //* as if file is written completely then we will get this call back function
      });
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootDir, "data", "homes.json");
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []); //* because inittaly error ayega
    });
  }

  static findById(homeID, callback) {
    this.fetchAll((homes) => {
      const HomeFound = homes.find((home) => home.id === homeID);
      callback(HomeFound);
    });
  }

  static deleteById(homeId, callback) {
    this.fetchAll((homes) => {
      homes = homes.filter((home) => home.id !== homeId);

      fs.writeFile(homeDataPath, JSON.stringify(homes), (error) => {
        Favourite.deleteById(homeId, callback);
      });
    });
  }
};
