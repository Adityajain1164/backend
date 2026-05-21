const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.use((req, res, next) => {
  console.log(req.method);
  next();
});

// app.use((req, res, next) => {
//   console.log("i am inside the third sending middle ware");

//   res.send(`<h>response by dummy third middle ware</h>`);
// });

app.get("/", (req, res, next) => {
  console.log("inside the home page");
  res.send(`<a href="/contact-us">Contact Us</a>`);
});

app.get("/contact-us", (req, res, next) => {
  console.log("inside the contact us page");
  res.send(`
  <h2>Contact Form</h2>

  <form action="/contact-us" method="POST">
    
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required />
    
    <br><br>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required />
    
    <br><br>

    <label for="number">Number:</label>
    <input type="tel" id="number" name="number" required />
    
    <br><br>

    <button type="submit">Submit</button>

  </form>
  `);

  //* we have to use body parser before the middle ware of post request
  app.use(bodyParser.urlencoded()); //* is automatically done the chunnk , buffer and bodyparsing work and give a body object wich we can excess easly;

  app.post("/contact-us", (req, res, next) => {
    console.log("inside the post request");
    console.log(req.body);

    res.send(`
    <h1>Thank You!</h1>
    <p>Your form has been submitted successfully.</p>
    <p>We will contact you soon.</p>

    <a href="/">Go Back</a>
    `);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is runinng at http://localhost:3000`);
});
