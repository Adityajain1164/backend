//* core module
const path = require("path");

//* Exteranal module
const express = require("express");

//* local module
const userRouter = require("./routes/userRoutes");
const { hostRouter } = require("./routes/hostRouter");
const errorController = require("./controller/error");
const rootDir = require("./utils/path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.urlencoded()); //* koi bhi request aye usko body object bana do
//* we dont have to call next because in this next is handeled internally
app.use("/user", userRouter);
app.use("/host", hostRouter);

//* for making css files public we make a a folder public and every file inside this public can we extracted by the user

app.use(express.static(path.join(rootDir, "public")));

app.use(errorController.get404); //* odering is very important //* to handle the error

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is runinng at http://localhost:3000/user`);
});
