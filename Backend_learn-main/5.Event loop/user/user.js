const http = require("http");
const fs = require("fs");

//* if we want only one header then
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Home page</title></head>");
    res.write("<body><h1> Enter your details </h1>");
    res.write('<form action="/submit-details" method="POST">');
    res.write(
      '<input type="text" name="username" placeholder="Enter your Name"> <br>',
    );
    res.write('<label for ="male">Male</label>>');
    res.write('<input type="radio" id="male" name="gender" value="male"/>');
    res.write('<label for ="female">female</label>>');
    res.write('<input type="radio" id="female" name="gender" value="female"/>');
    res.write('<input type="submit" value="Submit">');
    res.write("</form>");

    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/product") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Product</title></head>");
    res.write("<body><h1> Buy our exlusive product </h1></body>");
    res.write("</html>");

    return res.end();
  } else if (
    req.url.toLowerCase() === "/submit-details" &&
    req.method == "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const Fullbody = Buffer.concat(body).toString();
      console.log(Fullbody);

      const params = new URLSearchParams(Fullbody);

      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);

      //* if we wrtie the file outside the req.on(end()) and bodyobject make it global
      //* then bodyobject will be undefine because the file writing will we executed first

      //* write the file
      //fs.writeFileSync("user.txt", JSON.stringify(bodyObject));
      //* above code is the blocking code as it have to be perform by the event loop not by lubis
      //* so we dont have to write a call back error function and that redirecting code is out of req.on('end') but this make the event loop block so if we have to write it asyncly so redirecting code also have to be inside the file write

      fs.writeFile("user.txt", JSON.stringify(bodyObject), (err) => {
        console.log("Data Written successfully");
        res.statusCode = 302;
        res.setHeader("Location", "/"); //* we only redirect when file is written succesfully if we redirect it first and then there is some error in the file writing then user will never know thats why we write this inside the file writting
        return res.end();
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title> complete coding</title></head>");
    res.write("<body><h1> I belive in myslef </h1></body>");
    res.write("</html>");
    return res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`the server is start on http://localhost:${PORT}`);
});
