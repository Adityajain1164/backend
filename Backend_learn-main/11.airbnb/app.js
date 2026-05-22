//* core module
const path = require("path");

//* Exteranal module
const express = require("express");

//* local module
const userRouter = require("./routes/userRoutes");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/path");

const app = express();
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.urlencoded()); //* koi bhi request aye usko body object bana do
//* we dont have to call next because in this next is handeled internally
app.use("/user", userRouter);
app.use("/host", hostRouter);

app.use((req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "404.html"));
}); //* odering is very important

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is runinng at http://localhost:3000/user`);
});
