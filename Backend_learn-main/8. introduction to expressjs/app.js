// core modules
const http = require("http");
const fs = require("fs");

// external module
const express = require("express");

//local modules
const userRequestHandler = require("./user");

const app = express();

const server = http.createServer(app);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is started at http://localhost:3000`);
});
