const fs = require('fs');
const { promisify } = require('util');
const readDirAsync = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const fileStat = promisify(fs.stat);
const path = require('path');

async function isDirectory(p,file) {
    return fileStat(path.join(p,file)).then(s => [file,s.isDirectory()]);
}
async function filesDirs(p) {
        const files = await readDirAsync(p);
        const res = await Promise.all(files.map(v => isDirectory(p,v)));
        //console.log('res=',res);
        return res;


}
async function showDirectoryOrFileContent(p,file) {
    const pt = path.join(p,file);
    const isDir = await fileStat(pt).then(s => s.isDirectory());
    let res = isDir ? await filesDirs(pt) : await readFile(pt,'utf8'); 
    return {isDir,res}
}
//filesDirs('/home/m').then((f) => console.log(f)).catch(e => console.log('error=',e));
//showDirectoryOrFileContent('/home','monero').then(f => console.log(f)).catch(e => console.log(e));
//showDirectoryOrFileContent('/home/monero','tran1.html').then(f => console.log('file=',f)).catch(e => console.log('file error=',e));
module.exports = { filesDirs,showDirectoryOrFileContent }