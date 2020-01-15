const http = require('http');
const port = 443

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><h1>Hello World</h1></html>');
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});