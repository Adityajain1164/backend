const http = require("http");
const fs = require("fs");
const userRequestHandler = require("./user");

const server = http.createServer(userRequestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is started at http://localhost:3000`);
});
