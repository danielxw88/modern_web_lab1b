const http=require('http');
const fs=require('fs');
const path=require('path');


function serveFile(res, filePath, contentType, statusCode = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Create server
const server = http.createServer((req, res) => {
  console.log(`Request for: ${req.url}`);

  let filePath = '';
  let contentType = 'text/html';

  switch (req.url) {
    case '/':
      filePath = path.join(__dirname, 'pages', 'index.html');
      break;
    case '/about':
      filePath = path.join(__dirname, 'pages', 'about.html');
      break;
    case '/contact':
      filePath = path.join(__dirname, 'pages', 'contact.html');
      break;
    default:
      filePath = path.join(__dirname, 'pages', '404.html');
      res.statusCode = 404;
  }

  serveFile(res, filePath, contentType, res.statusCode);
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
