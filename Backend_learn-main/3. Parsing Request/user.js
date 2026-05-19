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
    //* chunks of data
    // req.on('data', (chunk)=>{
    //   console.log(chunk);     //* koi bhi jab changes hota hai usko track karne ke liye we use the on function
    //   //* this will tell us the data chunks that is coming in as request

    // });

    // //* Buffiring of Data
    // //* now if we want to collect the chunks in the buffer and then convert into meaning full data
    // const body=[];
    // req.on('data',(chunk)=>{
    //   console.log(chunk);
    //   body.push(chunk)

    // })
    // req.on('end',()=>{
    //   const Fullbody=Buffer.concat(body).toString();
    //   console.log(Fullbody);

    // })

    //* Parsing of data into a json format body object
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const Fullbody = Buffer.concat(body).toString();
      console.log(Fullbody);

      const params = new URLSearchParams(Fullbody);

      // const bodyObject = {};
      // for (const [key, value] of params.entries()) {
      //   bodyObject[key] = value;
      // }
      // console.log(bodyObject);

      //* another way of doing same is
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);

      //* write the file
      fs.writeFileSync("user.txt", JSON.stringify(bodyObject));
    });

    //fs.writeFileSync("user.txt", "Aditya jain");
    // //* data chunks me ata so this section will implement early then the req.on('end') and we have to write the file based on the data that request has bought so we have to move this file writing inside the red.on(end)

    res.statusCode = 302;
    res.setHeader("Location", "/");
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title> complete coding</title></head>");
  res.write("<body><h1> I belive in myslef </h1></body>");
  res.write("</html>");
  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`the server is start on http://localhost:${PORT}`);
});
