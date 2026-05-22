//* expernal modlule
const express = require("express");

//*local module
const userRouter = require("./routes/userRouter");

const app = express();

app.use(userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:3000`);
});
