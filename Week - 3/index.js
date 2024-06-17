const fs = require('fs');

// Function to read a file using callbacks
function readFileCallback(filename, callback) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, data);
    });
}

// Using the callback function
function readFileUsingCallback(filename) {
    readFileCallback('example.txt', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        console.log('File contents using callback funtion:', data);
    });
}


// Function that returns a Promise for reading a file
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

// Using the Promise
function readFileSync(filename) {
    readFilePromise(filename)
        .then(data => {
            console.log('File contents using promises:', data);
        })
        .catch(err => {
            console.error('Error reading file:', err);
        });
}


// Async function using async/await
async function readFileAsync(filename) {
    try {
        const data = await readFilePromise(filename);
        console.log('File contents using async/await:', data);
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

const filename = 'example.txt';

// Call the callback function
readFileUsingCallback(filename);

// Call the sync function
readFileSync(filename);

// Call the async function
readFileAsync(filename);
