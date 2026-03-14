import http from 'http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Docker Multi-stage Build!');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Server running at http://localhost:3000/');
});
