const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML form with the file list
        const htmlPath = path.join(__dirname, 'index.html');
        fs.readFile(htmlPath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading form');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'GET' && req.url === '/files') {
        // Serve the list of files
        fs.readdir(PUBLIC_DIR, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Error reading directory' }));
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(files));
        });
    } else if (req.method === 'GET' && req.url.startsWith('/file')) {
        const queryObject = url.parse(req.url, true).query;
        const filename = queryObject.name;
        const filepath = path.join(PUBLIC_DIR, filename);

        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && req.url === '/file') {
        // Handle form submission to create a file
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const filename = params.get('filename');
            const content = params.get('content');
            const filepath = path.join(PUBLIC_DIR, filename);

            fs.writeFile(filepath, content, err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error writing file');
                } else {
                    res.writeHead(201, { 'Content-Type': 'text/plain' });
                    res.end('File created');
                }
            });
        });
    } else if (req.method === 'POST' && req.url === '/delete') {
        // Handle form submission to delete a file
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const filename = params.get('filename');
            const filepath = path.join(PUBLIC_DIR, filename);

            fs.unlink(filepath, err => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('File deleted');
                }
            });
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method not allowed');
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
