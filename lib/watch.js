// todo: watch changes of files inside directories

const fs = require('fs');

var chokidar = require('chokidar');
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var userHome = require('user-home');

argv.loc = argv.loc || path.join(userHome, '/Archetype');


const readArchetype = () => {
  return new Promise(function(resolve, reject){
    fs.readdir(`${argv.loc}`, (err, data) => {
        err ? reject(err) : resolve(data);
    });
  });
}


const watch = () => {

  readArchetype().then(data => {
    let folders = data;
    console.log(typeof folders);
    data.map((folder, i) => {

      chokidar.watch(`${argv.loc}/${folder}`, {ignored: /(^|[\/\\])\../, ignoreInitial: true}).on('all', (event, path) => {
        // console.log(event, path, folders[i]);
        console.log(`change made in ${folders[i]}, #${[i]}`);
        });
    });
  });

}


module.exports = { watch }
