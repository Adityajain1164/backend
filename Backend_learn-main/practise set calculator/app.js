const http = require("http");
const requestHandler = require("./user");
const server = http.createServer(requestHandler);

const PORT = 3002;
server.listen(PORT, () => {
  console.log("server is started at http://localhost:3002");
});
