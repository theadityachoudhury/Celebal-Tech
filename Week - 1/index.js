const http = require('http');
const fs = require('fs');

const port = 5000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Hello World");
        res.end(); // End the response here
    } else if (req.url === "/about") {
        console.log("About Page");
        fs.readFile('index.html', function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404);
                res.write('Error: File Not Found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data); // Serve the content of index.html
            }
            res.end(); // End the response here
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("404 Page Not Found");
        res.end(); // End the response here
    }
});

server.listen(port, function (error) {
    if (error) {
        console.log(`Something went wrong ${error}`);
    } else {
        console.log(`Server is listening on port ${port}`);
    }
});
