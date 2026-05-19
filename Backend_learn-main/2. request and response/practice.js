const http=require('http');
const fs=require('fs');
const PORT=3002;
const server=http.createServer((req,res)=>{
  console.log(req.url,req.method,req.headers);
  
  if(req.url==='/'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>')
    res.write('<head><title>Home myntra</title></head>')
    res.write('<body>')
    res.write('<nav>')
    res.write('<a href="/home"> HOME </a>')
    res.write('<a href="/men"> Men </a>')
    res.write('<a href="/women"> Women </a>')
    res.write('<a href="/kids"> Kids </a>')
    res.write('<a href="/cart"> Cart </a>')
    res.write('</nav>')
    res.write('</body>')
    res.write('</html>')
    res.end();
  }else if(req.url==='/home'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>')
    res.write('<h1> welcome to home </h1>')
    res.write('</html>')
    res.end();
  }else if(req.url==='/men'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>')
    res.write('<h1> welcome to men </h1>')
    res.write('</html>')
    res.end();
  }else if(req.url==='/women'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>')
    res.write('<h1> welcome to women </h1>')
    res.write('</html>')
    res.end();
  }else if(req.url==='/kids'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>')
    res.write('<h1> welcome to kids </h1>')
    res.write('</html>')
    res.end();
  }else if(req.url==='/cart'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>')
    res.write('<h1> welcome to cart </h1>')
    res.write('</html>')
    res.end();
  }
  res.statusCode=400;
  res.end();  
  
})

server.listen(PORT, ()=>{
  console.log(`the sever is started at http://localhost:${PORT}`);
  
  
})