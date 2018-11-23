const fs = require('fs');
const { promisify } = require('util');
const readDirAsync = promisify(fs.readdir);


function readDir(path) {
    return readDirAsync(path);
}

module.exports = { readDir }