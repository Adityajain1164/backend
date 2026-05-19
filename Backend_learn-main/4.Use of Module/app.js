//* all the main work will be done in the app.js and we will import the funcitons

const http = require("http");
const userRequestHandler = require("./user");

const server = http.createServer(userRequestHandler);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`the server is start on http://localhost:${PORT}`);
});
