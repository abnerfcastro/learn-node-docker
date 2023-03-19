import http from 'http';

import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.resolve(process.cwd(), 'config', `.env.${process.env.NODE_ENV}`), debug: true });
}

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const publicDir = path.resolve(__dirname, '..', 'client');

console.log(JSON.stringify({ NODE_ENV: process.env.NODE_ENV, port, hostname }));

const server = http.createServer((req, res) => {  
  if (!req.url) {
    res.statusCode = 400;
    res.end('Error parsing file path');
    return;
  }

  const filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);
  
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Return a 404 error if the file doesn't exist
      res.statusCode = 404;
      res.end('File not found');
      return;
    }

    // Read the file and return it
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Return a 500 error if there was an error reading the file
        res.statusCode = 500;
        res.end('Error reading file');
        return;
      }

      // Set the content type based on the file extension
      const ext = path.extname(filePath);
      const contentType = getContentType(ext);

      // Set the headers and return the file contents
      res.setHeader('Content-Type', contentType);
      res.statusCode = 200;
      res.end(data);
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

function getContentType(extension: string): string {
  switch (extension) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.png':
      return 'image/png';
    case '.svg':
      return 'image/svg+xml';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    default:
      return 'text/plain';
  }
}