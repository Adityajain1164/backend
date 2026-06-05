//* data se related jo bhi task hai vo modle me hone chahiye
//* use db se fetch karna naya add karna and usko use karne ke liye export karna every thing

//* Core Modules
const path = require("path");
const fs = require("fs");

//* export the main path
const rootdir = require("../utils/path");
const { json } = require("stream/consumers");
const { error } = require("console");

//* fake database
//* can not assign the const as we are assiginig the
// let resigterHomes = [];

module.exports = class Home {
  constructor(houseName, location, price) {
    this.houseName = houseName;
    this.location = location;
    this.price = price;
  }

  //* as we are puching the body inside the registered home
  save() {
    Home.fetchAll((resigterHomes) => {
      resigterHomes.push(this);
      const homeDataPath = path.join(rootdir, "data", "home.json");
      fs.writeFile(homeDataPath, JSON.stringify(resigterHomes), (error) => {
        console.log("file writing concluder", error);
      });
    });
  }

  //* function which is not related to this object but related to the calss then we use static function

  static fetchAll(callback) {
    const filepath = path.join(rootdir, "data", "home.json");

    fs.readFile(filepath, (error, data) => {
      if (error) {
        callback([]);
      } else {
        callback(JSON.parse(data));
      }
    });
  }
};
