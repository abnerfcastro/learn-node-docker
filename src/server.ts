import http from 'http';

import * as dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: path.resolve(process.cwd(), 'config', `.env.${process.env.NODE_ENV}`), debug: true });
}

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

console.log(JSON.stringify({ NODE_ENV: process.env.NODE_ENV, port, hostname }));

const server = http.createServer((_, res) => {    
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});