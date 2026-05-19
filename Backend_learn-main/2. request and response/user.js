const http = require("http");
const fs=require('fs')

//* if we want only one header then
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Home page</title></head>");
    res.write("<body><h1> Enter your details </h1>");
    res.write('<form action="/submit-details" method="POST">');
    res.write('<input type="text" name="username" placeholder="Enter your Name"> <br>');
    res.write('<label for ="male">Male</label>>');
    res.write('<input type="radio" id="male" name="gender" value="male"/>')
    res.write('<label for ="female">female</label>>');
    res.write('<input type="radio" id="female" name="gender" value="female"/>')
    res.write('<input type="submit" value="Submit">')
    res.write('</form>');

    res.write('</body>');
    res.write("</html>");
    return res.end();

  } else if (req.url === "/product") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Product</title></head>");
    res.write("<body><h1> Buy our exlusive product </h1></body>");
    res.write("</html>");
    // res.end(); //* once we do end then the response is send to the client we can not write and set header so always use return function
    return res.end();

  }else if(req.url.toLowerCase()==='/submit-details' && req.method=="POST"){//* as req   postwali honi hi cahiye as no one can excess this url if it does not submit the data 

    fs.writeFileSync('user.txt','Aditya jain');  //* it is just example in real life we have to write the file with the data came from request 

    res.statusCode=302; //* this is status code for redirecting 
    res.setHeader('Location','/'); //* for directing to home page   
  
  
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