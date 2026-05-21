// // using express we can make server without the use of http module
// // core modules
// const http = require("http");

const fs = require("fs");

// external module
const express = require("express");

//local modules
const userRequestHandler = require("./user");

const app = express();

//* no need to create server and then pass app into it
//* server will be directly created by app
// const server = http.createServer(app);

// app.use("/", (req, res, next) => {
//   //* when ever we use "use" then the path is wildcard so any one having "/" will be matched by this
//   console.log("inside the first middle ware", req.url, req.method);
//   // res.send(`<h1> welcome to home page</h1>`);
//   //* after res.send you can not call next
//   next();
// });

app.post("/", (req, res, next) => {
  //* get or post are very specific about the path only occour when same path
  console.log("inside the first middle ware ", req.url, req.method);
  next();
});

app.use("/submit-detail", (req, res, next) => {
  console.log("inside second middle ware ", req.url, req.method);
  res.send(`<p>this response is send by the second middle ware</p>`);
  //* here we dont have to set the header and no need for res.write and also no need to do res.end();
  //*express is a helper library of node only all the code is on github check it ones
});

app.use("/", (req, res, next) => {
  console.log("inside 3rd middle ware", req.url, req.method);
  res.send("welcome to the home page");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is started at http://localhost:3000`);
});
//*insted of server.listen we can directly use app.listen
