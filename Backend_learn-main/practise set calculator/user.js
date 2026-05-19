const { log } = require("console");
const fs = require("fs");
const addition = require("./addition");
const chunkshandler = require("./chunks");
const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head>
          <title>Home</title>
        </head>
        <body>
          <h1>Welcome to calculator</h1>
          <a href="/calculator">Calculator Page</a>
        </body>
      </html>
    `);
    res.end();
  } else if (req.url === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html lang="en">
      <head>
  
      <title>Calculator</title>
      </head>
      <body>
        <form action="/submit" method="POST">
          <input type="number" name="digit1" placeholder="first digit"/><br>
          <input type="number" name="digit2" placeholder="second digit"/><br>
          <input type="submit" value="Submit"/>
        </form>
      </body>
      </html>
      
      
      `);
    res.end();
  } else if (req.url.toLowerCase() === "/submit" && req.method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      chunkshandler(chunk, body);
    });

    req.on("end", () => {
      const answer = addition(body, res); //* it is very imp to call in inside a call back function rather then a directly as data is coming slowly on on and then once end complete then it execute else body will be empty
      res.setHeader("Content-Type", "text/html");
      res.write(`
      <html>
          <head>
            <title>Result</title>
          </head>
          <body>
            <h1>Your result is ${answer}</h1>
            
          </body>
      </html>
      `);
      fs.writeFileSync("sum.txt", answer.toString());
      return res.end();
    });
  }
};

module.exports = requestHandler;
