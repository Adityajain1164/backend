//* core module
const path = require("path");

module.exports = path.dirname(require.main.filename);
//* this is the path of main file of project no ever one can write there path relative to this
