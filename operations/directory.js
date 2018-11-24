const fs = require('fs');
const { promisify } = require('util');
const readDirAsync = promisify(fs.readdir);
const fileStat = promisify(fs.stat);
const path = require('path');


function readDir(p) {
    return readDirAsync(p);
}
async function getIsDirectory(p,file) {
    return fileStat(path.join(p,file)).then(s => [file,s.isDirectory()]);
}
async function filesDirs(p) {
        const files = await readDirAsync(p);
        return Promise.all(files.map(v => getIsDirectory(p,v)));

}
filesDirs('/home/monero').then((f) => console.log(f)).catch(e => console.log(e));
module.exports = { readDir,fileInfo }